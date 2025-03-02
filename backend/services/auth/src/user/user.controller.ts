import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }
}
