import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable } from 'rxjs';
import { NestError } from '@app/http-lib/nest-error';
import { HttpExceptionHandlerService } from '@app/http-lib/http-exception-handler.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
    private readonly httpExceptionHandlerService: HttpExceptionHandlerService,
  ) {}

  decodeToken(authHeader: string | undefined): Observable<string> {
    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = authHeader.replace('Bearer ', '').trim();
    return this.userClient
      .send<{ id: string }, string>({ cmd: 'decode_token' }, token)
      .pipe(
        map<{ id: string }, string>((res) => res.id),
        catchError((error: NestError) =>
          this.httpExceptionHandlerService.handle(error),
        ),
      );
  }
}
