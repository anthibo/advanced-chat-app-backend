import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserInputDTO } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(credentials: UserInputDTO) {
    const user = await this.userService.getUserByUserName(credentials.username);
    if (!user) throw new HttpException('wrong username or password', 403);
    const isValid = await user.comparePassword(credentials.password);
    if (!isValid) throw new HttpException('wrong username or password', 403);
    const payload = { id: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async register(credentials: UserInputDTO) {
    const response = await this.userService.createUser(credentials);
    return response;
  }
}
