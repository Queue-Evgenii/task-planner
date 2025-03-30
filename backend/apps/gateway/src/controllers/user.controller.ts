import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { LoginDto } from '@app/dto-lib/user/login.dto';
import { UserDto } from '@app/dto-lib/user/user.dto';
import { HttpMessage } from '@app/http-lib/http-message.dto';
import { HttpResponse } from '@app/http-lib/http-response.dto';
import { HttpExceptionHandlerService } from '@app/http-lib/http-exception-handler.service';
import { NestError } from '@app/http-lib/nest-error';

@Controller('api/user')
export class UserController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
    private readonly httpExceptionHandlerService: HttpExceptionHandlerService,
  ) {}

  @Post('create')
  create(@Body() user: UserDto): Observable<HttpMessage> {
    return this.userClient
      .send<unknown, UserDto>({ cmd: 'create_user' }, user)
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }

  @Post('login')
  login(@Body() loginData: LoginDto): Observable<HttpMessage> {
    return this.userClient
      .send<unknown, LoginDto>({ cmd: 'login_user' }, loginData)
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }
}
