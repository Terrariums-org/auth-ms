import { HashedPasswordPortRepository } from '../../domain/repositories/hashedPasswordPortRepository';
import { configService } from '../../../shared/dto';
import { hashSync, compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptRepositoryImp implements HashedPasswordPortRepository {
  private readonly bcyptJumps: number = parseInt(
    configService.get('BCRYPT_JUMPS'),
  );
  async createPasswordHash(password: string): Promise<string> {
    try {
      return await hashSync(password, this.bcyptJumps);
    } catch (error) {
      throw new Error(error);
    }
  }
  async compareCredentials(
    originalPassword: string,
    passwordRequest: string,
  ): Promise<boolean> {
    try {
      const isCorrect = await compareSync(passwordRequest, originalPassword);
      return isCorrect;
    } catch (error) {
      throw new Error(error);
    }
  }
}
