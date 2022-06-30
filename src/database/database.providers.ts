import * as mongoose from 'mongoose';
import { ConfigurationKeys } from 'src/config/configuration.keys'; 
export const databaseProviders = [
    {
        provide : ConfigurationKeys.DATABASE_CONNECTION ,
        useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb+srv://Oriental222:5xW4z9Zcu-QD-Vt@cluster0.vu6dj4j.mongodb.net/?retryWrites=true&w=majority'),
        },
];