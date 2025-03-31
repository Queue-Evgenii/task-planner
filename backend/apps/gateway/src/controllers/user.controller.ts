import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { UserDto } from '@app/dto-lib/user/user.dto';
import { HttpMessage } from '@app/http-lib/http-message.dto';
import { HttpResponse } from '@app/http-lib/http-response.dto';
import { HttpExceptionHandlerService } from '@app/http-lib/http-exception-handler.service';
import { NestError } from '@app/http-lib/nest-error';
import { AuthenticatedRequest, AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/user')
export class UserController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
    private readonly httpExceptionHandlerService: HttpExceptionHandlerService,
  ) {}

  @Get('me')
  getUser(@Request() req: AuthenticatedRequest): Observable<HttpMessage> {
    const email = req.user.email as string;
    return this.userClient
      .send<UserDto, string>({ cmd: 'get_user' }, email)
      .pipe(
        map((res) => new HttpResponse(res)),
        catchError((error: NestError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }
}
