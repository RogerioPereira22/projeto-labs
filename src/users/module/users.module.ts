import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from '../providers/users.providers';

import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders,AuthService],
})
export class UsersModule {}
