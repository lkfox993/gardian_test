import { Controller, Get, Delete, Param, Body, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('api/customers')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class CustomerController {

    constructor(private readonly customerService: CustomerService) { }

    @Get()
    @Roles(Role.Administrator)
    getCustomers() {
        return this.customerService.getCustomers();
    }
    
    @Post()
    @Roles(Role.Administrator)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.createCustomer(createCustomerDto);
    }

    @Delete(':id')
    @Roles(Role.Administrator)
    deleteCustomer(@Param('id') id: string) {
        return this.customerService.deleteCustomer(id);
    }

}
