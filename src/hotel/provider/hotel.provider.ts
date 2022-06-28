import { Connection } from 'mongoose';
import { HotelSchema } from '../schema/hotel.schema';

export const catsProviders = [
  {
    provide: 'HOTEL_MODEL',
    useFactory: (connection: Connection) => connection.model('Hotel', HotelSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];