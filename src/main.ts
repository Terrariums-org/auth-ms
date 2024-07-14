import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AUTH_QUEUE } from './shared/constants';
import { configService } from './shared/dto';

async function bootstrap() {
  const logger = new Logger('Main-auth');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: configService.get('BROKER_HOST'),
      queue: AUTH_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  logger.log('Auth microservice started on port ' + process.env.PORT);
}
bootstrap();
