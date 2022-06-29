import { Module } from '@nestjs/common';
import { ReservaService } from '../service/reserva.service';
import { ReservaController } from '../controller/reserva.controller'; 
import { DatabaseModule } from 'src/database/database.module';
import { ReservaProviders } from '../providers/reserva.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservaController],
  providers: [ReservaService,...ReservaProviders],
})
export class ReservaModule {}
