import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Room } from './entities/chat-room.entity';
import { RoomParticipant } from './entities/room-participant.entity';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly userService: UserService,
    @InjectRepository(RoomParticipant)
    private readonly participantRepository: Repository<RoomParticipant>,
  ) {}
  async createPrivateRoom(usersIds: number[]) {
    const users = [] as User[];
    for (const userId of usersIds) {
      const user = await this.userService.getUserById(userId);
      if (!user) throw new HttpException('user not found', 404);
      users.push(user);
    }
    const roomName = await this.hashRoomName(usersIds);
    console.log(roomName);
    const room = await this.roomRepository.save({
      name: roomName,
    });
    for (const user of users) {
      await this.participantRepository.save({
        room,
        user,
      });
    }
    console.log(room);
    return { roomName: room.name, receiverUsername: users[1].username };
  }

  async listCurrentUserRooms(user: User) {
    const rooms = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoin('room.roomParticipants', 'roomParticipant')
      .where('roomParticipant.user.id = :userId', { userId: user.id })
      .getMany();
    for (const room of rooms) {
      const roomsParticipants = await this.participantRepository.find({
        where: { room: room, user: Not(user.id) },
      });
      room.roomParticipants = roomsParticipants;
    }
    console.log(rooms);
    return rooms;
  }

  private async hashRoomName(ids: number[]) {
    const roomString = `${ids.toString()}-room`;
    const name = crypto
      .createHash('sha256')
      .update(roomString)
      .digest('base64')
      .substring(0, 5);
    return name;
  }
}
