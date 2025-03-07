import { LoginDto } from './login.dto';

export interface UserDto extends LoginDto {
  name: string;
  surname: string;
}
