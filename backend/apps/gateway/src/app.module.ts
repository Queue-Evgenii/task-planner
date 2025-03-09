import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TaskController } from './controllers/task.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpLibModule } from '@app/http-lib/http-lib.module';

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
  controllers: [UserController, TaskController],
})
export class AppModule {}
