import { PasswordPayload } from './password-payload.interface';

export interface PasswordService {
  hash(password: string): PasswordPayload;

  verify(password: string, storedPassword: PasswordPayload): boolean;
}
