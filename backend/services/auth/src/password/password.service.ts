import { PasswordPayload } from './password-payload.dto';

export interface PasswordService {
  hash(password: string): PasswordPayload;

  verify(password: string, storedPassword: PasswordPayload): boolean;
}
