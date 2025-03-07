import { HttpException, Injectable, Logger } from '@nestjs/common';
import { throwError } from 'rxjs';
import { HttpError } from './http-error.dto';

@Injectable()
export class HttpExceptionHandlerService {
  private readonly logger = new Logger(HttpExceptionHandlerService.name);

  handle(error: HttpError) {
    this.logger.error(`Error: ${error.message}, Status: ${error.status}`);
    return throwError(() => new HttpException(error.message, error.status));
  }
}
