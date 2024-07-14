import { Controller, Inject } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { CreateLoginDTO } from '../../domain/dto/create-login.dto';
import { CreateUserDto } from '../../domain/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_QUEUE } from 'src/shared/constants';

@Controller()
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @MessagePattern({ cmd: AUTH_QUEUE.loginService })
  async login(@Payload() createLogin: CreateLoginDTO) {
    return this.authService.loginService(createLogin);
  }

  @MessagePattern({ cmd: AUTH_QUEUE.registerService })
  async register(@Payload() createUser: CreateUserDto) {
    return this.authService.registerService(createUser);
  }
}
