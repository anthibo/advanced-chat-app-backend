import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../user/user.entity';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('/')
  async listCurrentUserRooms(@Req() req: Request, @Res() res: Response) {
    const rooms = await this.roomService.listCurrentUserRooms(req.user as User);
    res.json({ rooms });
  }
}
