import { configService } from '../../../shared/dto';
import { TokenPortRepository } from '../../domain/repositories/tokenPortRepository';
import { sign, decode } from 'jsonwebtoken';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TokenRepositoryImp implements TokenPortRepository {
  private readonly secretWord: string = configService.get('JWT_SECRET');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async generateToken(userPayload: any): Promise<string> {
    try {
      const token = await sign(userPayload, this.secretWord, {
        expiresIn: '1h',
      });
      return token;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async decodeToken(token: string): Promise<any> {
    try {
      const decodePayload = await decode(token);
      return decodePayload;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
