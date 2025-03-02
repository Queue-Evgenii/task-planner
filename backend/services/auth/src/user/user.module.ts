import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordModule } from 'src/password/password.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { TokenModule } from 'src/token/token.module';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule, TokenModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
