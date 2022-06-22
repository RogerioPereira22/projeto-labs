import { Document } from 'mongoose';
export class Task extends Document {
  name:string;
  email:string;
  password: string;
}
