import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { CreateReservaDto } from '../dto/create-reserva.dto';
import { ReservasDataObject } from '../objects';
import { Reserva, ReservaDocument } from '../schema/reserva.schema';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class ReservaService {
  static MAX_RESERVAS_PER_DAY = 25;

  public logger = new Logger(ReservaService.name);

  constructor(
    @InjectModel(Reserva.name) private reservaModel: Model<ReservaDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  //isso retornará reservas anteriores também
  async get(hotel: string): Promise<ReservasDataObject[]> {
    const reservas = await this.reservaModel.find({
      hotel,
    });

    return reservas.map((reserva) => reserva.plainToInstance());
  }

  async isHotelAvailable(
    hotel: string,
    start: Date,
    end: Date,
  ): Promise<boolean> {
    const currrentReservas = await this.reservaModel.find({
      hotel,
      checkIn: { $lte: start },
      checkOut: { $gte: end },
    });

    if (currrentReservas?.length >= ReservaService.MAX_RESERVAS_PER_DAY) {
      return false;
    }

    return true;
  }

  async create(
    createReservaDto: CreateReservaDto,
  ): Promise<ReservasDataObject> {
    const { hotel, checkIn, checkOut } = createReservaDto;
    const transactionSession = await this.connection.startSession();
    try {
      transactionSession.startTransaction();

      const isAvailable = await this.isHotelAvailable(hotel, checkIn, checkOut);

      if (!isAvailable) {
        this.logger.log(
          `hotel ${hotel} reached max reservas on ${checkIn} ${checkOut}`,
        );
        throw new NotFoundException(
          `hotel reached max reservas on ${checkIn} - ${checkOut}`,
        );
      }

      const reserva = new this.reservaModel(createReservaDto);
      const reservaDoc: any = await reserva.save();
      transactionSession.commitTransaction();

      return reservaDoc.plainToInstance();
    } catch (e) {
      await transactionSession.abortTransaction();
      throw e;
    } finally {
      await transactionSession.endSession();
    }
  }
}
