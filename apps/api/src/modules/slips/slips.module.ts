import { Module } from '@nestjs/common';
import { SlipsController } from './slips.controller.js';
import { SlipsService } from './slips.service.js';

@Module({
  controllers: [SlipsController],
  providers: [SlipsService],
  exports: [SlipsService],
})
export class SlipsModule {}
