import { DecodeTokenResInterface, PayloadInterface, TokenResponse } from '../entities';

export interface TokenServiceRepository {
  signToken(payload: PayloadInterface): Promise<TokenResponse>;
  decodeToken(token: string): Promise<DecodeTokenResInterface>;
}
