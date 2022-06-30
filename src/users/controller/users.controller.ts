import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ConfigurationKeys } from 'src/config/configuration.keys';

@Controller(ConfigurationKeys.users)
@UseGuards(ThrottlerGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(ConfigurationKeys.id1)
  findOne(@Param(ConfigurationKeys.id) id: string) {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exists');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(ConfigurationKeys.id1)
  update(
    @Param(ConfigurationKeys.id) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User does not exists');
    }
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(ConfigurationKeys.id1)
  remove(@Param(ConfigurationKeys.id) id: string) {
    return this.usersService.remove(id);
  }
}
