import { Body, Controller, Inject } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { CreateLoginDTO } from '../../domain/dto/create-login.dto';
import { CreateUserDto } from '../../domain/dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth.login.user' })
  async login(@Body() createLogin: CreateLoginDTO) {
    return this.authService.loginService(createLogin);
  }

  @MessagePattern({ cmd: 'auth.register.auth' })
  async register(@Body() createUser: CreateUserDto) {
    return this.authService.registerService(createUser);
  }
}
