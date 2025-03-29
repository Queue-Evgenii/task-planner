import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PasswordService } from '@app/auth/password/password.service';
import { TokenService } from '@app/auth/token/token.service';
import { User } from '@app/db-lib/user.dto.entity';
import { UserService } from './user.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('PasswordService')
    private readonly passwordService: PasswordService,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async login(user: User): Promise<string> {
    const remoteUser = await this.getUserByEmailOrThrow(user.email);
    this.throwIfPasswordInvalid(user.password, remoteUser);
    return this.tokenService.createToken(user.email);
  }

  private async getUserByEmailOrThrow(email: string): Promise<User> {
    const remoteUser = await this.userService.getUserByEmail(email);
    if (!remoteUser) {
      throw new RpcException(
        new HttpException(
          'User with provided email not exists',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    }
    return remoteUser;
  }

  private throwIfPasswordInvalid(password: string, remoteUser: User) {
    if (
      !this.passwordService.verify(password, {
        password: remoteUser.password,
        salt: remoteUser.salt,
      })
    ) {
      throw new RpcException(
        new HttpException('Invalid password', HttpStatus.UNAUTHORIZED),
      );
    }
  }
}
