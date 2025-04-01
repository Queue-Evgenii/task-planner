import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

void (async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.MS_HOST || '0.0.0.0',
        port: parseInt(process.env.MS_PORT as string, 10) || 3002,
      },
    },
  );

  await app.listen();
})();
