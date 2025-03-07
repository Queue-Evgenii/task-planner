import { Module } from '@nestjs/common';
import { HttpExceptionHandlerService } from './http-exception-handler.service';

@Module({
  providers: [HttpExceptionHandlerService],
  exports: [HttpExceptionHandlerService],
})
export class HttpLibModule {}
