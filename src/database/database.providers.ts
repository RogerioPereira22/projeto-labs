import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide :'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb+srv://Oriental222:5xW4z9Zcu-QD-Vt@cluster0.vu6dj4j.mongodb.net/?retryWrites=true&w=majority'),
        },
];