import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from '@app/auth/password/password.service';
import { TokenService } from '@app/auth/token/token.service';
import { User } from '@app/db-lib/user.dto.entity';
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

  async login(user: User): Promise<string> {
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

    return this.tokenService.createToken(user.email);
  }
}
