import { User } from "src/users/interfaces/users.interfaces";
import { CreateUserDto } from "../dto/create-user.dto"; 

export class UserMapper {
  dtoToEntity(userDto:CreateUserDto): User {
    return new User(
   userDto.id,
      
   userDto.username,
     
    );
  }

  entityToDto(user: User):UserDto {
    return newUserDto(
      user.id,
     
      user.username,  
     
    );
  }
}