import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { CreateCustomerDto } from './customer/dto/create-customer.dto'; 

@Controller()
export class AppController {

  constructor(private readonly customerService: CustomerService) { }

  @Post('/api/register')
  register(@Body() createCustomerDto: CreateCustomerDto){
    return this.customerService.createCustomer(createCustomerDto);
  }

}
