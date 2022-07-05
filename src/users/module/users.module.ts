import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { Users, UsersSchema } from '../schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    AuthModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
