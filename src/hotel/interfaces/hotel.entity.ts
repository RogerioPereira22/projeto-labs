
import { Document } from 'mongoose';
export interface Hotel extends Document  {
  readonly hotel: string;
}