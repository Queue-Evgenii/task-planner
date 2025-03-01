import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'task-planner',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    TokenModule,
    PasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
