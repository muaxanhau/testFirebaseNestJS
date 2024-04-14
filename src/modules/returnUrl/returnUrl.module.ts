import { Module } from '@nestjs/common';
import { ReturnUrlController } from './returnUrl.controller';

@Module({
  controllers: [ReturnUrlController],
  providers: [],
})
export class ReturnUrlsModule {}
