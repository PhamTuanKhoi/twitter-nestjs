import mongoose from 'mongoose';
import { UserRoleEnum } from '../../dto/user-role.enum';
import { User } from '../../schema/user.schema';

export const userStub = (): User & { _id: mongoose.Types.ObjectId } => {
  return {
    _id: new mongoose.Types.ObjectId('650172ef0d664fb851603e72'),
    name: 'Pham Tuan khoi',
    email: 'khoi@gmail.com',
    password: '1234',
    role: UserRoleEnum.USER,
    block: false,
  };
};
