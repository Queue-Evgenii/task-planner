import { HttpMessage } from './http-message.dto';

export class HttpError extends HttpMessage {
  constructor(
    public message: string,
    public status: number,
  ) {
    super();
  }
}
