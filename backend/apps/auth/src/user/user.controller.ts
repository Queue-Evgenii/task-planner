import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'libs/db-lib/src/user.dto.entity';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'create_user' })
  create(user: User) {
    console.log(123);
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'login_user' })
  login(user: User) {
    return this.authService.login(user);
  }
}
