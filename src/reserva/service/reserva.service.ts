import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservaDto } from '../dto/create-reserva.dto';
import { UpdateReservaDto } from '../dto/update-reserva.dto';
import { Reserva } from '../entities/reserva.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigurationKeys } from 'src/config/configuration.keys';

@Injectable()
export class ReservaService {
  constructor(
    @InjectModel(ConfigurationKeys.RESERVA_MODEL) private reservaModel: Model<Reserva>,
  ) {}
  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    try{
    const createdReserva = new this.reservaModel(createReservaDto);
    return createdReserva.save();
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Reserva[]> {
    try{
    return this.reservaModel.find().exec();
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<Reserva> {
    try{
    return this.reservaModel.findById(id).exec();
    }
    catch(error){
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateReservaDto): Promise<Reserva> {
    
    try{
      return this.reservaModel.findByIdAndUpdate(
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
    try{
    return this.reservaModel
      .deleteOne({
        _id: id,
      })
      .exec();
    }
      catch(error){
        throw new BadRequestException(error.message);
      }
  }
}
