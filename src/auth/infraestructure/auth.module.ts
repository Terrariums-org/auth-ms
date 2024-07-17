import { Global, Module } from '@nestjs/common';
import { AuthService } from '../application/services/auth.service';
import { AuthController } from '../infraestructure/controller/auth.controller';
import { TokenService } from '../application/services/token.service';
import { TokenRepositoryImp } from './ports/TokenRepositoryImp.port';
import { BcryptRepositoryImp } from './ports/BcryptRepositoryImp.port';
import { HashedPasswordService } from '../application/services/hashedPassword.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from './ports/mysql';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile, User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    //application injection
    AuthService,
    TokenService,
    HashedPasswordService,
    //infraestructure injection
    TokenRepositoryImp,
    BcryptRepositoryImp,
  ],
})
export class AuthModule {}
