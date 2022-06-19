import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { SlotService } from './slot.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { CreateSlotDto } from './dto/create-slot.dto';

@Controller('api/slots')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class SlotController {

    constructor(private readonly slotService: SlotService) {}

    @Get()
    @Roles(Role.Administrator)
    getSlots() {
        return this.slotService.getSlots();
    }

    @Post()
    @Roles(Role.Administrator)
    createSlot(@Body() createSlotDto: CreateSlotDto) {
        return this.slotService.createSlot(createSlotDto);
    }

    @Delete(':id')
    @Roles(Role.Administrator)
    deleteSlot(@Param('id') id: string) {
        return this.slotService.deleteSlot(id);
    }

}
