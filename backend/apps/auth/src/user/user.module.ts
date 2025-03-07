import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PasswordModule } from '@app/auth/password/password.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/db-lib/user.dto.entity';
import { TokenModule } from '@app/auth/token/token.module';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule, TokenModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
