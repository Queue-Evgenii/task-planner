import { Controller, Inject } from '@nestjs/common';
import { TokenService } from './token.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TokenController {
  constructor(
    @Inject('TokenService') private readonly tokenService: TokenService,
  ) {}

  @MessagePattern({ cmd: 'verify_token' })
  verify(token: string) {
    return this.tokenService.verifyToken(token);
  }

  @MessagePattern({ cmd: 'decode_token' })
  decode(token: string) {
    return this.tokenService.decodeToken(token);
  }
}
