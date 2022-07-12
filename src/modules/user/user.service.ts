import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputDTO } from '../auth/dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(input: UserInputDTO) {
    const { password, username } = input;
    const existingUser = await this.userRepository.findOne({ username });
    if (existingUser)
      throw new HttpException('this username is already taken', 409);
    const user = this.userRepository.create({ password, username });
    await this.userRepository.save(user);
    return { message: 'user is created successfully' };
  }

  async CheckUserNameIsAvailable(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ username });
    return user === null;
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    return user;
  }
}
