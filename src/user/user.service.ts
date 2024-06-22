import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleEnum } from './dto/user-role.enum';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { IUserService } from './interfaces/user.service.impl';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  // {
  //   "name": "Pham Tuan Thanh",
  //   "email": "thanh@gmail.com",
  //   "password": "1234",
  //   "role": "user"
  // }
  async create(registerUserDto: RegisterUserDto): Promise<User> {
    try {
      const email_exist = await this.findByEmail(registerUserDto.email);

      if (email_exist)
        throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);

      registerUserDto.password = await bcrypt.hash(
        registerUserDto.password,
        10,
      );

      const created = await this.userRepository.create({
        ...registerUserDto,
      });

      this.logger.log(`Register user success`, created?._id);
      return created;
    } catch (error) {
      this.logger.error(error?.message, error.stack);
      throw new BadRequestException(error?.message);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async isModelExist(id, isOptional = false, msg = ''): Promise<User> {
    if (isOptional && !id) return;
    const errorMessage = msg || `${User.name} not found`;
    const isExist = await this.findById(id);
    if (!isExist) throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    return isExist;
  }
}
