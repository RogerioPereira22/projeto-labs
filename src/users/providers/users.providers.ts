import { Connection } from 'mongoose';
import { UsersSchema } from '../schemas/users.schema';
import { ConfigurationKeys } from 'src/config/configuration.keys';
export const usersProviders = [
  {
    provide: ConfigurationKeys.USERS_MODEL,
    useFactory: (connection: Connection) => connection.model(ConfigurationKeys.Users, UsersSchema),
    inject: [ConfigurationKeys.DATABASE_CONNECTION],
  },
];