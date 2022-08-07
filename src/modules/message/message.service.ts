import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/chat-room.entity';
import { User } from '../user/user.entity';
import { CreateMessageDTO } from './dto/message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  async saveMessage(createMessageDto: CreateMessageDTO) {
    // save message in db and elasticsearch
    const { from, message, roomName, time } = createMessageDto;
    const newMessage = this.messageRepository.create({
      sender: await this.userRepository.findOne({ where: { username: from } }),
      room: await this.roomRepository.findOne({ where: { name: roomName } }),
      message,
      time,
    });
    await this.messageRepository.save(newMessage);
  }

  listChatMessages() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
