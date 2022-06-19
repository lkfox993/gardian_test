import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Slot, SlotDocument } from '../schemas/slot.schema';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class SlotService {

  constructor(@InjectModel(Slot.name) private slotModel: Model<SlotDocument>) {}

  getSlots() {
    return this.slotModel.find({ 
      startTime: { $gte: new Date()
    }}).populate('customer').exec();
  }

  createSlot(createSlotDto: CreateSlotDto) {

    const createdSlot = new this.slotModel(createSlotDto);
    return createdSlot.save();
  }

  deleteSlot(id: string) {
    return this.slotModel.findByIdAndDelete(id).exec();
  }
  
}
