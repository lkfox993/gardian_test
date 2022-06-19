import { IsDate, IsNotEmpty, IsEmail, IsPhoneNumber, IsNumber } from 'class-validator';
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
    slot: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

}