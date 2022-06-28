import { Connection } from 'mongoose';
import { ReservaSchema } from './reserva.schema';

export const ReservaProviders = [
  {
    provide: 'RESERVA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Reserva', ReservaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
