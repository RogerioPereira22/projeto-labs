import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Oriental222:5xW4z9Zcu-QD-Vt@cluster0.ynhjkvu.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
