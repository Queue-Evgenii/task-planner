import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

void (async function bootstrap() {
  dotenv.config();
  //console.log(process.env.DATABASE_PASSWORD)

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
})();
