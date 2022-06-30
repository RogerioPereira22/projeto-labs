import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../interfaces/users.interfaces';
import {
  encryptPassword,
  comparePassword,
} from 'src/common/encrypt/encryption';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('USERS_MODEL') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      if (createdUser)
        throw new BadRequestException(`This username is already taken`);
      createUserDto['password'] = encryptPassword(createUserDto.password);
      return createdUser.save();
    } catch (error) {
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
   
    try { return this.userModel.findByIdAndUpdate(
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
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
  async login({username, password}: LoginUserDto): Promise<any>{
    try {
      const user = await this._userRepository.findOne({where: {username: username}});
      if(!user) throw new BadRequestException(`User not exist`);

      if(comparePassword(password, user.password)){
        return this._authService.login(user);
      }

      throw new BadRequestException(`Password not match`);
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

}
