import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { BaseAbstractRepository } from '../database/base.abstract.repository';

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) model: Model<UserDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super(model);
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).lean().exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('+password').lean();
  }
}
