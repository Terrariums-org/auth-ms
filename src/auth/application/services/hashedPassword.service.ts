import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HashedPasswordServiceRepository } from '../../domain/repositories/hashedPasswordServiceRepository';
import { BcryptRepositoryImp } from '../../infraestructure/ports/BcryptRepositoryImp.port';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class HashedPasswordService implements HashedPasswordServiceRepository {
  constructor(
    @Inject(BcryptRepositoryImp)
    private readonly bcryptRepositoryImp: BcryptRepositoryImp,
  ) {}
  async encodePassword(password: string): Promise<string> {
    try {
      return await this.bcryptRepositoryImp.createPasswordHash(password);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
  async comparePassword(
    originalPassword: string,
    passwordRequest: string,
  ): Promise<boolean> {
    try {
      return await this.bcryptRepositoryImp.compareCredentials(
        originalPassword,
        passwordRequest,
      );
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
