import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateSlotDto {

    @IsDate()
    @IsNotEmpty()
    startTime: Date;

    @IsDate()
    @IsNotEmpty()
    endTime: Date;

}