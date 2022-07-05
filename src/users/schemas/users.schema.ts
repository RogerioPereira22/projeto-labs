import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { UsersDataObject } from '../objects/users.object';
import { plainToInstance } from 'class-transformer';
export type GuestDocument = Users &
  Document & {
    plainToInstance: () => UsersDataObject;
    timestamp: Date;
  };
  
  @Schema()
  export class Users{
    @Prop({
      required: true,
    })
    name: string;
  
    @Prop({
      required: true,
    })
    email: string;
  
    @Prop({
      required: true,
    })
    phoneNumber: string;
    @Prop({
      required: true,
    })
    password: String,
}
export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.index({ email: 'text' });
UsersSchema.index({ phoneNumber: 'text' });

UsersSchema.method('plainToInstance', function () {
  return plainToInstance(UsersDataObject, this.toObject());
});