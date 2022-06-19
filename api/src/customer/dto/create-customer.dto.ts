import { IsDate, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CreateCustomerDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsObjectId()
    @IsNotEmpty()
    slotId: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

}