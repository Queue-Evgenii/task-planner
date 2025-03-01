import { PasswordPayload } from './password-payload.interface';

export interface HashStrategy {
  hash(password: string): PasswordPayload;

  verify(password: string, storedPassword: PasswordPayload): boolean;
}
