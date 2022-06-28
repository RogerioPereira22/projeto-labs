import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './reserva.interfaces';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservaService {
  constructor(
    @InjectModel('RESERVA_MODEL') private reservaModel: Model<Reserva>,
  ) {}
  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const createdReserva = new this.reservaModel(createReservaDto);
    return createdReserva.save();
  }

  async findAll(): Promise<Reserva[]> {
    return this.reservaModel.find().exec();
  }

  async findOne(id: string): Promise<Reserva> {
    return this.reservaModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateReservaDto): Promise<Reserva> {
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

  remove(id: string) {
    return this.reservaModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
