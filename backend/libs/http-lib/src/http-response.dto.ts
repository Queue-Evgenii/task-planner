import { HttpMessage } from './http-message.dto';

export class HttpResponse<T> extends HttpMessage {
  constructor(public data: T) {
    super();
  }
}
