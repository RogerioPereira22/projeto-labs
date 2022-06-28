import { UpdateHotelDto } from '../dto/update-hotel.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from '../dto/create-hotel.dto'; 
import { Hotel } from '../entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(@InjectModel('HOTEL_MODEL') private hotelModel : Model<Hotel>) {
}
  async create(CreateHotelDto: CreateHotelDto):Promise<Hotel> {
   const createdHotel = new this.hotelModel(CreateHotelDto)
    return createdHotel.save();
  }

  async findAll():Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async findOne(id: string):Promise<Hotel> {
    return this.hotelModel.findById(id).exec();
  }

  async update(id: string, updateHotelDto: UpdateHotelDto):Promise<Hotel> {
  return this.hotelModel.findByIdAndUpdate({
      _id:id
    },
   {
     updateHotelDto
    },
   {
    new:true
   },
   );
    }

   remove(id: string) {
  return this.hotelModel.deleteOne({
      _id:id,
    })
    .exec();
  }
  }

