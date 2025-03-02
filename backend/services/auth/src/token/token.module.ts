import { Module } from '@nestjs/common';
import { JWTStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '1h' },
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
