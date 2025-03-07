import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordModule } from '../password/password.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/db-lib/src/user.dto.entity';
import { TokenModule } from '../token/token.module';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule, TokenModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
