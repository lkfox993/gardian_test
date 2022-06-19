import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../auth/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({
        required: true,
        index: {
            unique: true
        }
    }) 
    email: string;

    @Prop({
        required: true
    })
    role: Role

    @Prop({
        required: true
    }) 
    password: string;    

}

export const UserSchema = SchemaFactory.createForClass(User);