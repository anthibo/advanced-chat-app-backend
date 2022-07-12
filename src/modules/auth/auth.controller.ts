import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserInputDTO } from './dto/user.dto';
import { Public } from './guards/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() body: UserInputDTO, @Res() res: Response) {
    const { message } = await this.authService.register(body);
    res.json({ message });
  }

  @Public()
  @Post('login')
  async login(@Body() body: UserInputDTO, @Res() res: Response) {
    const accessToken = await this.authService.login(body);
    res.json({ accessToken });
  }
}
