import {IsEmail,IsString} from 'class-validator'
export class CreateUserDto {
    email:string;

    name:string;

    password:string;
}
