import { PasswordPayload } from '@app/dto-lib/auth/password-payload.dto';

export interface PasswordService {
  hash(password: string): PasswordPayload;

  verify(password: string, storedPassword: PasswordPayload): boolean;
}
