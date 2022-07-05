import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { isValidObjectId } from 'mongoose';
  import { HotelService } from '../service/hotel.service'; 
  
  @Injectable()
  export class HotelGuard implements CanActivate {
    constructor(private hotelService: HotelService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const solici = context.switchToHttp().getRequest();
      const hotelId = solici.params.hotelId;
  
      if (!isValidObjectId(hotelId)) {
        throw new BadRequestException('Invalid hotel id');
      }
  
      const hotelInfo = await this.hotelService.findById(hotelId);
  
      if (!hotelInfo) {
        throw new BadRequestException('Invalid hotel id');
      }
  
      return true;
    }
  }