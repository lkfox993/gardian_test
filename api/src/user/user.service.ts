import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    getUsers() {
        return this.userModel.find().exec();
    }

    getUser(filter: FilterQuery<UserDocument>){
        return this.userModel.findOne(filter).exec();
    }

    createUser(createUserDto: CreateUserDto) {

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }

}
