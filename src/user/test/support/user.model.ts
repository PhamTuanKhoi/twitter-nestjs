import { User } from '../../schema/user.schema';
import { userStub } from '../stubs/user.stub';
import { MockModel } from '../../../database/test/mock.model';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();

  findById(): { lean: () => { exec: () => User } } {
    return {
      lean: () => ({
        exec: (): User => ({ ...this.entityStub }),
      }),
    };
  }
}
