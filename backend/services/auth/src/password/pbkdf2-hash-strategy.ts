import { Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'crypto';
import { PasswordPayload } from './password-payload.interface';
import { PasswordService } from './password.service';

@Injectable()
export class PBKDF2HashStrategy implements PasswordService {
  private readonly iterations = 10000;
  private readonly keyLength = 64;
  private readonly digest = 'sha512';

  hash(password: string): PasswordPayload {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = pbkdf2Sync(
      password,
      salt,
      this.iterations,
      this.keyLength,
      this.digest,
    ).toString('hex');

    return { salt, password: hashedPassword };
  }

  verify(password: string, storedPassword: PasswordPayload): boolean {
    const hashedPassword = pbkdf2Sync(
      password,
      storedPassword.salt,
      this.iterations,
      this.keyLength,
      this.digest,
    );
    const storedHashBuffer = Buffer.from(storedPassword.password, 'hex');

    if (hashedPassword.length !== storedHashBuffer.length) return false;

    return timingSafeEqual(hashedPassword, storedHashBuffer);
  }
}
