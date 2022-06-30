import { Connection } from 'mongoose';
import { HotelSchema } from '../schema/hotel.schema';
import { ConfigurationKeys } from 'src/config/configuration.keys';

export const hotelProviders = [
  {
    provide: ConfigurationKeys.HOTEL_MODEL,
    useFactory: (connection: Connection) =>
      connection.model(ConfigurationKeys.hotel, HotelSchema),
    inject: [ConfigurationKeys.DATABASE_CONNECTION],
  },
];
