import { Module } from '@nestjs/common';
import { ReservaService } from '../service/reserva.service';
import { Reserva, ReservaSchema } from '../schema/reserva.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }]),
  ],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
