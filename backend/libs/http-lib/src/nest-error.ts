import { TimeoutError } from 'rxjs';
import { HttpError } from './http-error.dto';

export type NestError = HttpError | TimeoutError;
