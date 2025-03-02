import { Module } from '@nestjs/common';
import { PBKDF2HashStrategy } from './pbkdf2-hash-strategy';

@Module({
  providers: [
    {
      provide: 'PasswordService',
      useClass: PBKDF2HashStrategy,
    },
  ],
  exports: ['PasswordService'],
})
export class PasswordModule {}
