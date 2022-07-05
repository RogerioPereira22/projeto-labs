import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}
