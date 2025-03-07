import { HttpMessage } from './http-message.dto';

export interface HttpResponse<T> extends HttpMessage {
  data: T;
}
