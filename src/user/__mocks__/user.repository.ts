import { userStub } from '../test/stubs/user.stub';

export const UserRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findByEmail: jest.fn().mockResolvedValue(userStub()),
  find: jest.fn().mockResolvedValue([userStub()]),
  findById: jest.fn().mockResolvedValue(userStub()),
});
