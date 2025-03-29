import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JWTStrategy implements TokenService {
  constructor(private jwtService: JwtService) {}

  createToken(payload: string): string {
    return this.jwtService.sign({ id: payload });
  }

  verifyToken(token: string): boolean {
    try {
      return !!this.jwtService.verify(token);
    } catch {
      return false;
    }
  }

  decodeToken(token: string): string {
    if (!this.verifyToken(token)) {
      throw new RpcException(
        new HttpException('Token has expired!', HttpStatus.UNAUTHORIZED),
      );
    }
    return this.jwtService.decode(token);
  }
}
