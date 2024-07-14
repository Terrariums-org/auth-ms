import { Inject, Injectable } from '@nestjs/common';
import { HashedPasswordServiceRepository } from '../../domain/repositories/hashedPasswordServiceRepository';
import { BcryptRepositoryImp } from '../../infraestructure/ports/BcryptRepositoryImp.port';

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
      throw new Error(error);
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
      throw new Error(error);
    }
  }
}
