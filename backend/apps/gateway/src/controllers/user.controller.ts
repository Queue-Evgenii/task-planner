import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { LoginDto } from 'libs/dto-lib/src/user/login.dto';
import { UserDto } from 'libs/dto-lib/src/user/user.dto';
import { HttpMessage } from 'libs/http-lib/src/http-message.dto';
import { HttpError } from 'libs/http-lib/src/http-error.dto';

@Controller('api/user')
export class UserController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post('create')
  create(@Body() user: UserDto): Observable<HttpMessage> {
    return this.userClient
      .send<string, UserDto>({ cmd: 'create_user' }, user)
      .pipe(
        catchError((error: HttpError) => {
          throw new HttpException(error.message, error.status);
        }),
      );
  }

  @Post('login')
  login(@Body() loginData: LoginDto): Observable<HttpMessage> {
    return this.userClient
      .send<string, LoginDto>({ cmd: 'login_user' }, loginData)
      .pipe(
        map((res) => {
          return {
            data: res,
          };
        }),
        catchError((error: HttpError) => {
          throw new HttpException(error.message, error.status);
        }),
      );
  }
}
