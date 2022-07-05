import { Exclude, Expose, Transform } from 'class-transformer';
import { transformToAlias } from '../../utils';
import { Hotels } from '../interfaces';

@Exclude()
export class HotelDataObject implements Hotels {
  @Expose()
  @Transform(transformToAlias('_id'))
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public hotelId: string;

  @Expose()
  public location: [number, number];

  @Expose()
  public avaliacao?: number;
}
