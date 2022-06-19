import { Controller, Get, Param, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('api/users')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @Roles(Role.Administrator)
    getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    @Roles(Role.Administrator)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Delete(':id')
    @Roles(Role.Administrator)
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

}
