import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  findById: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  create: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
});
