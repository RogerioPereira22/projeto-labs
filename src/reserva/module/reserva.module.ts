import { Module } from '@nestjs/common';
import { ReservaService } from '../service/reserva.service';
import { ReservaController } from '../controller/reserva.controller'; 
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
