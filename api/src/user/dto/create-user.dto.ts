import { IsNotEmpty, IsEmail, IsPhoneNumber, IsArray } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsArray()
    @IsNotEmpty()
    roles: [string];

    @IsNotEmpty()
    password: string;

}