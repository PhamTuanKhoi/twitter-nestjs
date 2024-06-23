import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { RegisterUserDto } from '../dto/register-user.dto';
import { userStub } from './stubs/user.stub';
import { User } from '../schema/user.schema';
import { HttpException } from '@nestjs/common';

jest.mock('../user.repository');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;
  let registerUserDto: RegisterUserDto;

  //   thiết lập dữ liệu
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<UserRepository>(
      UserRepository,
    ) as jest.Mocked<UserRepository>;

    registerUserDto = {
      name: userStub().name,
      email: userStub().email,
      password: '123456',
      role: userStub().role,
    };

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await userService.findAll();
      });

      test('then it should call userRepository', () => {
        expect(userRepository.find).toHaveBeenCalledWith({});
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('create', () => {
    it('should throw an error if email already exists', async () => {
      await expect(userService.create(registerUserDto)).rejects.toThrow(
        HttpException,
      );
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    it('should create a new user successfully', async () => {
      // overwrite value findByEmail mockResolvedValue null
      userRepository.findByEmail.mockResolvedValue(null);
      const user: User = await userService.create(registerUserDto);

      expect(user).toEqual(
        expect.objectContaining({
          name: userStub().name,
          email: userStub().email,
        }),
      );
      expect(user).toEqual(userStub());
      expect(userRepository.create).toHaveBeenCalled();
    });
  });
});
