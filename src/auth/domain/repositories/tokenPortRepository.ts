import { PayloadInterface } from '../entities';

export interface TokenPortRepository {
  generateToken(userPayload: PayloadInterface): Promise<string>;
  decodeToken(token: string): Promise<PayloadInterface>;
}
