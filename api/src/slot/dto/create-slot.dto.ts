import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateSlotDto {

    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date;

}