import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../interfaces/users.interfaces';
import { encryptPassword,comparePassword } from 'src/common/encrypt/encryption';

@Injectable()
export class UsersService {
  constructor(@InjectModel('USERS_MODEL') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    try {
      const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
    createUserDto['password'] = encryptPassword(createUserDto.password);

    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }
    

  

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
