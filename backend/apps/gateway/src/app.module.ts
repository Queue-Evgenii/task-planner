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
          host: 'localhost',
          port: 3001,
        },
      },
      {
        name: 'TASK_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
    HttpLibModule,
  ],
  providers: [AuthService],
  controllers: [UserController, AuthController, TaskController],
})
export class AppModule {}
