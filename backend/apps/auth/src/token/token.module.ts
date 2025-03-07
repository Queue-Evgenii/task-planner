import { Module } from '@nestjs/common';
import { JWTStrategy } from './jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './token.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET_KEY'),
        signOptions: { expiresIn: '2h' },
      }),
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
