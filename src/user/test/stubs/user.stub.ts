import { UserRoleEnum } from '../../dto/user-role.enum';
import { User } from '../../schema/user.schema';

export const userStub = (): User => {
  return {
    name: 'Pham Tuan Thanh',
    email: 'thanh@gmail.com',
    password: '1234',
    role: UserRoleEnum.USER,
    block: false,
  };
};
