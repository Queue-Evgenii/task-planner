import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PBKDF2HashStrategy } from './pbkdf2-hash-strategy';

@Module({
  providers: [
    {
      provide: 'HashStrategy',
      useClass: PBKDF2HashStrategy,
    },
    PasswordService,
  ],
  exports: [PasswordService],
})
export class PasswordModule {}
