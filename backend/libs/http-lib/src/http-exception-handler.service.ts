import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { throwError, TimeoutError } from 'rxjs';
import { HttpError } from './http-error.dto';

@Injectable()
export class HttpExceptionHandlerService {
  private readonly logger = new Logger(HttpExceptionHandlerService.name);

  handle(error: HttpError | TimeoutError) {
    if (error instanceof TimeoutError) {
      return throwError(
        () => new HttpException(error.message, HttpStatus.GATEWAY_TIMEOUT),
      );
    }
    if (error.code && error.code === 'ECONNREFUSED') {
      return throwError(
        () =>
          new HttpException(
            'Connection refused',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
      );
    }
    this.logger.error(`Error: ${error.message}, Status: ${error.status}`);
    return throwError(() => new HttpException(error.message, error.status));
  }
}
