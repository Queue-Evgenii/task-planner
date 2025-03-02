import { Controller, Get, Headers, Inject } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(
    @Inject('TokenService') private readonly tokenService: TokenService,
  ) {}

  @Get('verify')
  verify(@Headers('authorization') authHeader: string) {
    return this.tokenService.verifyToken(authHeader);
  }
}
