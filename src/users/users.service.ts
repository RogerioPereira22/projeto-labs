import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users:User[]=[];
  create(createUserDto: CreateUserDto) {
    const currentMaxiId = this.users[this.users.length -1]?.id || 0;
   
    const id = currentMaxiId +1;

    const user ={
      id,
     ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
      const index = this.users.findIndex((user) => user.id=id);

      return this.users[index];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
   const user = this.findOne(id);
   
   const newUser = {
    ...user,
    ...updateUserDto,
   };
   const index = this.users.findIndex((user) => user.id=id);
   this.users[index] =newUser;

    return newUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id=id);
    this.users.splice(index,1);
    return `This action removes a #${id} user`;
  }
}