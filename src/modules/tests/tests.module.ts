import { Module } from '@nestjs/common';
import { TestsController } from './tests.controller';
import { UsersService } from 'src/services';

@Module({
  controllers: [TestsController],
  providers: [UsersService],
})
export class TestsModule {}
