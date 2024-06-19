import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../schema/user.schema';
import { Test } from '@nestjs/testing';
import { userStub } from './stubs/user.stub';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await userController.findAll();
      });

      test('then it should call userService', () => {
        expect(userService.findAll).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });
});

// ----------------------------------------------------- mock thủ công ---------------------------------------------------------
// describe('UserController', () => {
//   let userController: UserController;
//   let userService: UserService;

//   beforeEach(async () => {
//     const UserServiceMock = {
//       findAll: jest.fn().mockResolvedValue([userStub()]),
//     };

//     const moduleRef: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         {
//           provide: UserService,
//           useValue: UserServiceMock,
//         },
//       ],
//     }).compile();

//     userController = moduleRef.get<UserController>(UserController);
//     userService = moduleRef.get<UserService>(UserService);
//     jest.clearAllMocks();
//   });

//   describe('getUsers', () => {
//     describe('when getUsers is called', () => {
//       let users: User[];

//       beforeEach(async () => {
//         users = await userController.findAll();
//         console.log(users, 1); // Thêm log để kiểm tra giá trị trả về
//       });

//       test('then it should call userService', () => {
//         expect(userService.findAll).toHaveBeenCalled();
//       });

//       test('then it should return users', () => {
//         expect(users).toEqual([userStub()]);
//       });
//     });
//   });
// });
