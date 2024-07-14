import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: ['.dev.env', '.production.env'],
});

export const configService = new ConfigService();
