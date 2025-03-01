import { Inject, Injectable } from '@nestjs/common';
import { PasswordPayload } from './password-payload.interface';
import { HashStrategy } from './hash-strategy.interface';

@Injectable()
export class PasswordService {
  constructor(@Inject('HashStrategy') private hashService: HashStrategy) {}

  hashPassword(password: string): PasswordPayload {
    return this.hashService.hash(password);
  }

  validateService(password: string, storedPassword: PasswordPayload): boolean {
    return this.hashService.verify(password, storedPassword);
  }
}
