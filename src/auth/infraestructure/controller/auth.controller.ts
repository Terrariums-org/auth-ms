import { Controller, Inject } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { CreateLoginDTO } from '../../domain/dto/create-login.dto';
import { CreateUserDto } from '../../domain/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_QUEUE } from 'src/shared/constants';
import { TokenService } from 'src/auth/application/services/token.service';
import { TokenServiceRepository } from 'src/auth/domain/repositories/tokenServiceRepository';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(TokenService) private readonly tokenService: TokenServiceRepository,
  ) {}

  @MessagePattern({ cmd: AUTH_QUEUE.loginService })
  async login(@Payload() createLogin: CreateLoginDTO) {
    return this.authService.loginService(createLogin);
  }

  @MessagePattern({ cmd: AUTH_QUEUE.registerService })
  async register(@Payload() createUser: CreateUserDto) {
    return this.authService.registerService(createUser);
  }

  @MessagePattern({ cmd: AUTH_QUEUE.VERIFY_TOKEN })
  verifyToken(@Payload() token: string) {
    return this.tokenService.decodeToken(token);
  }
}
