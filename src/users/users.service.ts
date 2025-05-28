import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    console.log('findByEmail result:', user);
    return user;
  }

  async createUser(username:string, email: string, password: string): Promise<User> {
    console.log('Creating user with password (plain):', password);
    const hashed = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashed);
    const createdUser = new this.userModel({username, email, password: hashed });
    return createdUser.save();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    console.log('Validating user:', email, password);
    const user = await this.findByEmail(email);
    if (!user) {
      console.log('User not found');
      return null;
    }
    console.log('Stored hashed password:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Password mismatch');
      return null;
    }
    return user;
  }
}
