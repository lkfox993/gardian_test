import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotService } from './slot.service';
import { SlotController } from './slot.controller';
import { Slot, SlotSchema } from '../schemas/slot.schema';
import { ShedulerService } from './sheduler/sheduler.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Slot.name, schema: SlotSchema },
    ]),
  ],
  providers: [SlotService, ShedulerService],
  controllers: [SlotController]
})
export class SlotModule {}
