import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from 'src/services';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
