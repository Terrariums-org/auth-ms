import { Module } from '@nestjs/common';
import { AuthModule } from './auth/infraestructure/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './shared/dto';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.production.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get('HOST'),
      port: configService.get('PORT'),
      username: configService.get('USERDB'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
