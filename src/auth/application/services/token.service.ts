import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  TokenResponse,
  PayloadInterface,
  DecodeTokenResInterface,
  DecodeTokenInterface,
} from '../../domain/entities';
import { TokenServiceRepository } from '../../domain/repositories/tokenServiceRepository';
import { TokenRepositoryImp } from '../../infraestructure/ports/TokenRepositoryImp.port';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TokenService implements TokenServiceRepository {
  constructor(
    @Inject(TokenRepositoryImp)
    private readonly tokenRepositoryImp: TokenRepositoryImp,
  ) {}
  async signToken(payload: PayloadInterface): Promise<TokenResponse> {
    try {
      const token = await this.tokenRepositoryImp.generateToken(payload);
      const tokenObj: TokenResponse = {
        id: payload.id,
        token,
        email: payload.email,
      };
      return tokenObj;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }
  async decodeToken(token: string): Promise<DecodeTokenResInterface> {
    try {
      const payload: DecodeTokenInterface =
        await this.tokenRepositoryImp.decodeToken(token);
      const currentDate = new Date();
      const expiresDate = new Date(payload.exp);
      const response = await {
        id: payload.id,
        username: payload.username,
        isExpired: +expiresDate <= +currentDate / 1000,
      };
      return response;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }
}
