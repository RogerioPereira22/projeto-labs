import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
  Validate,
} from 'class-validator';
import { IsBeforeConstraint, IsDateConstraint } from '../../utils';

export class CreateInputEntrada {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Rogerio',
    description: 'Name da Reserva',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'rogerio@example.com',
    description: 'Email da reserva',
  })
  email: string;

  @IsPhoneNumber()
  @ApiProperty({
    type: String,
    example: '+559876543210',
    description: 'Telefone da Reserva',
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
    example: '2022-08-01',
    description: 'Verifique a data in aaaa-mm-dd',
  })
  @Validate(IsDateConstraint)
  @Validate(IsBeforeConstraint, ['checkOut'])
  checkIn: Date;

  @ApiProperty({
    type: String,
    example: '2022-07-05',
    description: 'Verifique a data in aaaa-mm-dd',
  })
  @Validate(IsDateConstraint)
  checkOut: Date;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: '350',
    description: 'Valor para reservar hotel',
  })
  mount: number;
}