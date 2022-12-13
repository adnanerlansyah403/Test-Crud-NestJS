/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  Delete
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import CreateUserDto from './../../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  getUsers(){
    return this.userService.getUsers()
  }

  @Get('id/:id')
  findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUsersById(id);
  }

  @Post('/store')
  createUser(@Body() request: CreateUserDto) {
    return this.userService.createUser(request)
  }
  
  @Put('/update/:id')
  updateUser(@Body() request: CreateUserDto, @Param('id') userId: number) {
    return this.userService.updateUser(request, userId)
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId)
  }

}
