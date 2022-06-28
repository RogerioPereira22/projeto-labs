import { Document } from 'mongoose';

export interface Reserva extends Document  {
  readonly reserva: string;
}

