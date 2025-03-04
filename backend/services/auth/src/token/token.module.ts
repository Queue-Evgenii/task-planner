import { Module } from '@nestjs/common';
import { JWTStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES_IN },
    }),
  ],
  providers: [
    {
      provide: 'TokenService',
      useClass: JWTStrategy,
    },
  ],
  controllers: [TokenController],
  exports: ['TokenService'],
})
export class TokenModule {}
