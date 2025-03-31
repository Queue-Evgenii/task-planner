import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@app/db-lib/user.dto.entity';
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
    return this.userService.create(user);
  }

  @MessagePattern({ cmd: 'login_user' })
  login(user: User) {
    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(email: string) {
    return this.userService.getUserByEmail(email);
  }
}
