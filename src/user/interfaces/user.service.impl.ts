import { RegisterUserDto } from '../dto/register-user.dto';
import { User } from '../schema/user.schema';

export interface IUserService {
  create(registerUserDto: RegisterUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
