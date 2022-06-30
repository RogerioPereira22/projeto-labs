import { Connection } from 'mongoose';
import { ConfigurationKeys } from 'src/config/configuration.keys';
import { ReservaSchema } from '../schema/reserva.schema';

export const ReservaProviders = [
  {
    provide:ConfigurationKeys.RESERVA_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(ConfigurationKeys.reserva, ReservaSchema),
    inject: [ConfigurationKeys.DATABASE_CONNECTION],
  },
];
