
import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Slot } from './slot.schema';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop() 
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Slot',  autopopulate: true })
    slot: Slot

    @Prop() 
    phone: string;  

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);