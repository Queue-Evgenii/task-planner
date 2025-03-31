import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

export interface AuthenticatedRequest extends Request {
  user: {
    email?: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    const email = await firstValueFrom(
      this.authService.decodeToken(authHeader),
    );

    request.user = request.user || {};
    request.user.email = email;

    return true;
  }
}
