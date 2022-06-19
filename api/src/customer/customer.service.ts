import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from '../schemas/customer.schema';

import { CreateCustomerDto } from './dto/create-customer.dto'; 

@Injectable()
export class CustomerService {

    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

    getCustomers() {
        return this.customerModel.find().exec();
    }

    createCustomer(createCustomerDto: CreateCustomerDto) {
        const createdCustomer = new this.customerModel(createCustomerDto);
        return createdCustomer.save();
    }

    deleteCustomer(id: string) {
        return this.customerModel.findByIdAndDelete(id).exec();
    }

}
