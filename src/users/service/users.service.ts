import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePassword, encryptPassword } from 'src/common/encrypt/encryption';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersDataObject } from '../objects/users.object'; 
import { Users, UsersDocument } from '../schemas/users.schema';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
@Injectable()
export class UsersService {
  private _authService: AuthService;
  constructor(
    @InjectModel(Users.name) private UsersModel: Model<UsersDocument>,
  ) {}

  async upsert(createUsersDto: CreateUserDto): Promise<UsersDataObject> {
    const UsersDoc = await this.UsersModel.findOneAndUpdate(
      {
        email: createUsersDto.email,
      },
      {
        $set: {
          name: createUsersDto.name,
          phoneNumber: createUsersDto.phoneNumber,
          password : encryptPassword(createUsersDto.password),
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

    return UsersDoc.plainToInstance();
  }


 
  async login({ username, password }: LoginUserDto): Promise<any> {
    try {
      const user = await this.UsersModel.findOne({
        where: { username: this.UsersModel.name },
      });
      if (!user) throw new BadRequestException(`User not exist`);

      if (comparePassword(password, user.password)) {
        return this._authService.login(user);
      }

      throw new BadRequestException(`Password not match`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  
}
}