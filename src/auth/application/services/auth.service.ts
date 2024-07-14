import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLoginDTO, CreateUserDto } from '../../domain/dto';
import { AuthServiceRepository } from '../../domain/repositories/authServiceRepository';
import { CustomError } from '../../../shared/entities';
import { Repository } from 'typeorm';
import { TokenService } from './token.service';
import { HashedPasswordService } from './hashedPassword.service';
import { TokenResponse } from '../../domain/entities';
import { User } from '../../infraestructure/ports/mysql';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService implements AuthServiceRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(TokenService) private readonly tokenService: TokenService,
    @Inject(HashedPasswordService)
    private readonly hashedPasswordService: HashedPasswordService,
  ) {}
  async loginService(user: CreateLoginDTO): Promise<TokenResponse> {
    try {
      const loginUser = await this.userRepository.findOne({
        where: {
          email: user?.email,
        },
      });
      if (loginUser) {
        const {
          username,
          id,
          passwordUser: passwordOriginal,
          email,
        } = loginUser;
        const { passwordUser: passwordReq } = user;
        const isValid = await this.hashedPasswordService.comparePassword(
          passwordOriginal,
          passwordReq,
        );
        if (!isValid) {
          throw new RpcException({
            status: HttpStatus.UNAUTHORIZED,
            message: 'Credenciales invalidas',
          });
        }
        const token = this.tokenService.signToken({ id, username, email });
        return token;
      } else {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'Credenciales Invalidas',
        });
      }
    } catch (err) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message,
      });
    }
  }
  async registerService(user: CreateUserDto): Promise<TokenResponse> {
    try {
      const existingUserByEmail = await this.userRepository.findOne({
        where: {
          email: user?.email,
        },
      });
      const existingUserByUsername = await this.userRepository.findOne({
        where: {
          username: user?.username,
        },
      });
      if (!existingUserByEmail && !existingUserByUsername) {
        const { passwordUser } = user;
        //encriptar contraseña
        const passwordHashed =
          await this.hashedPasswordService.encodePassword(passwordUser);
        const newUser = {
          ...user,
          passwordUser: passwordHashed,
        };
        const userCreated = await this.userRepository.save(newUser);
        const { id, username, email } = userCreated;
        const token = await this.tokenService.signToken({
          id,
          username,
          email,
        });
        return token;
      } else if (existingUserByEmail) {
        throw new RpcException({
          status: HttpStatus.CONFLICT,
          message: `usuario con email: ${user?.email} existente`,
        });
      } else {
        throw new RpcException({
          status: HttpStatus.CONFLICT,
          message: `usuario con nombre: ${user?.username} existente`,
        });
      }
    } catch (err) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: err.message,
      });
    }
  }
}
