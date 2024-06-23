import { FilterQuery } from 'mongoose';
import { UserRepository } from '../user.repository';
import { UserModel } from './support/user.model';
import { User } from '../schema/user.schema';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { userStub } from './stubs/user.stub';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  // Theo dõi đối tượng cụ thể (Instance-Level Spying)
  // jest.spyOn chỉ theo dõi phương thức findOne trên userModelInstance -> user.
  // Nếu bạn tạo một đối tượng khác từ UserModel và gọi findOne, nó sẽ không được theo dõi vd: user1: User.
  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
      }).compile();

      userRepository = moduleRef.get<UserRepository>(UserRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));

      userFilterQuery = {
        _id: userStub()._id,
      };

      jest.clearAllMocks();
    });

    describe('findAll when find is called', () => {
      let users: User[];

      beforeEach(async () => {
        jest.spyOn(userModel, 'find');
        users = await userRepository.find(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.find).toHaveBeenCalledWith(userFilterQuery);
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });

    describe('findById when findById is called', () => {
      let user: User;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findById');
        user = await userRepository.findById(userStub()._id.toString());
      });

      test('then it should call the userModel', () => {
        expect(userModel.findById).toHaveBeenCalledWith(userStub()._id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  // Theo dõi nguyên mẫu (Prototype-Level Spying)
  // jest.spyOn(UserModel.prototype, 'save'); mọi đối tượng được tạo từ UserModel sẽ có phương thức save được theo dõi.
  // vd: user1 = new UserModel(). user2 = new UserModel()
  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile();

      userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    describe('create -> when create is called', () => {
      let user: User;
      let saveSpy: jest.SpyInstance;
      let constructorSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(UserModel.prototype, 'save');
        constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
        user = await userRepository.create(userStub());
      });

      test('then it should call the userModel', () => {
        expect(saveSpy).toHaveBeenCalled();
        expect(constructorSpy).toHaveBeenCalledWith(userStub());
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
