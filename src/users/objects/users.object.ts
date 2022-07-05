import { Exclude, Expose, Transform } from 'class-transformer';
import { transformToAlias } from '../../utils';
import { Users } from '../interfaces';

@Exclude()
export class UsersDataObject implements Users {
  @Expose()
  @Transform(transformToAlias('_id'))
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public phoneNumber: string;

  @Expose()
  public password: string;
}
