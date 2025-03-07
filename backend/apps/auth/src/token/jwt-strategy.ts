import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Injectable()
export class JWTStrategy implements TokenService {
  constructor(private jwtService: JwtService) {}

  createToken(payload: string): string {
    return this.jwtService.sign({ id: payload });
  }

  verifyToken(token: string): boolean {
    try {
      if (this.jwtService.verify(token)) return true;
      return false;
    } catch {
      return false;
    }
  }
}
