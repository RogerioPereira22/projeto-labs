import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { DatabaseModule } from 'database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [ReservaController],
  providers: [ReservaService]
})
export class ReservaModule {}
