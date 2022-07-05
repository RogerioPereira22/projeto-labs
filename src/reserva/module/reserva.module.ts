import { Module } from '@nestjs/common';
import { ReservaService } from '../service/reserva.service';
import { DatabaseModule } from 'src/database/database.module';
import { ReservaProviders } from '../providers/reserva.providers';
import { Reserva, ReservaSchema } from '../schema/reserva.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }]),
  ],
  providers: [ReservaService, ...ReservaProviders],
})
export class ReservaModule {}
