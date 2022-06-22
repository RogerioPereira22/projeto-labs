import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Oriental222:5xW4z9Zcu-QD-Vt@cluster0.ynhjkvu.mongodb.net/?retryWrites=true&w=majority')
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
