import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseService } from '../common/utils/response.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private responseService: ResponseService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<{ success: boolean; message: string; data?: User }> {
    try {
      const { email, password } = createUserDto;
      const existingUserResponse = await this.findByEmail(email);

      if (existingUserResponse.success) {
        return this.responseService.handleError(
          'User with this email already exists',
        );
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      await user.save();
      return this.responseService.handleSuccess(
        'User created successfully',
        user,
      );
    } catch (error) {
      return this.responseService.handleError('Failed to create user');
    }
  }

  async findByEmail(
    email: string,
  ): Promise<{ success: boolean; message: string; data?: User }> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (user) {
        return this.responseService.handleSuccess('User found', user);
      } else {
        return this.responseService.handleError('User not found');
      }
    } catch (error) {
      return this.responseService.handleError(
        'Error occurred while finding user',
      );
    }
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<{ success: boolean; message: string; data?: User }> {
    try {
      const userResponse = await this.findByEmail(email);
      if (!userResponse.success) {
        return this.responseService.handleError('User not found');
      }
      const user = userResponse.data;
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        return this.responseService.handleSuccess('Password is correct', user);
      } else {
        return this.responseService.handleError('Invalid password');
      }
    } catch (error) {
      return this.responseService.handleError(
        'Error occurred during validation',
      );
    }
  }

  async getUserCount(): Promise<{
    success: boolean;
    message: string;
    count?: number;
  }> {
    try {
      const count = await this.userModel.estimatedDocumentCount().exec();
      return this.responseService.handleSuccess(
        'User count retrieved successfully',
        { count },
      );
    } catch (error) {
      return this.responseService.handleError('Failed to retrieve user count');
    }
  }
}
