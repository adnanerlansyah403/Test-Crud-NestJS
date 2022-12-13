/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from 'src/dto/user.dto';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  getUsers(){
    return this.userRepository.find();
  }

  async updateUser(request: CreateUserDto, userId: number){
    console.log(request)
    const userExist = await this.userRepository.findOne({
      where:{
        id: userId
      }
    })
    if(!userExist){
      throw new BadRequestException("Data user tidak ditemukan")
    }

    // Login Update
    userExist.email = request.email
    userExist.username = request.username
    userExist.password = request.password

    return await this.userRepository.update(userId, userExist )
  }

  createUser(request: CreateUserDto){
    const user = this.userRepository.create(request)
    return this.userRepository.save(user)
  }

  findUsersById(id:number){
    return this.userRepository.findOne({where:{id}})
  }

  async deleteUser(userId: number) {
    // get existing data
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      }
    })

    if(!user) {
      throw new BadRequestException('User tidak di temukan');
    }

    // execute delete query
    this.userRepository.remove(user);
  }
}
