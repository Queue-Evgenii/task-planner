import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('PasswordService')
    private readonly passwordService: PasswordService,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
  ) {}

  async login(user: User): Promise<{ access_token: string }> {
    const remoteUser = await this.userService.getUserByEmail(user.email);
    if (
      !remoteUser ||
      !this.passwordService.verify(user.password, {
        password: remoteUser.password,
        salt: remoteUser.salt,
      })
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const access_token = this.tokenService.createToken(user.email);
    return { access_token };
  }
}
