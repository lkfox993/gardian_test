import { IsNotEmpty, IsEmail, IsPhoneNumber, IsArray } from 'class-validator';
import { Role } from '../../auth/role.enum';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    role: Role;

    @IsNotEmpty()
    password: string;

}