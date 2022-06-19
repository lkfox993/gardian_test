import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment';

export type SlotDocument = Slot & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class Slot {

    @Prop({ required: true })
    startTime: Date;

    @Prop({ required: true })
    endTime: Date;

    @Prop({ required: false, index: true, default: function(){
        return moment(this.startTime).subtract(3, 'hours');
    }})
    notifyTime: Date;

    @Prop({ required: false, index: true, default: false })
    notified: boolean;

}

export const SlotSchema = SchemaFactory.createForClass(Slot);

SlotSchema.virtual('customer', {
    ref: 'Customer',
    localField: '_id',
    foreignField: 'slot',
    justOne: true
})
  