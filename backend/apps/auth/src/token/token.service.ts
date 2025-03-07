export interface TokenService {
  createToken(payload: string): string;

  verifyToken(token: string): boolean;
}
