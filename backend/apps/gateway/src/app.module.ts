import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpLibModule } from '@app/http-lib/http-lib.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_HOST || 'auth',
          port: parseInt(process.env.AUTH_PORT as string, 10) || 3001,
        },
      },
      {
        name: 'TASK_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.TASK_HOST || 'task',
          port: parseInt(process.env.TASK_PORT as string, 10) || 3002,
        },
      },
    ]),
    HttpLibModule,
  ],
  providers: [AuthService],
  controllers: [UserController, AuthController, TaskController],
})
export class AppModule {}
