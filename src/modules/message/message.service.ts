import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { Room } from '../room/entities/chat-room.entity';
import { User } from '../user/user.entity';
import { CreateMessageDTO } from './dto/message.dto';
import { Message } from './entities/message.entity';
import { MessageSearchService } from './message-search.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectQueue('messages-queue') private readonly messagesQueue: Queue,
    private readonly MessageSearchService: MessageSearchService,
  ) {}
  async saveMessage(messageBody: CreateMessageDTO) {
    // save message in db and elasticsearch
    const { from, message, roomName, time } = messageBody;
    const newMessage = this.messageRepository.create({
      sender: await this.userRepository.findOne({ where: { username: from } }),
      room: await this.roomRepository.findOne({ where: { name: roomName } }),
      message,
      time,
    });
    await this.messageRepository.save(newMessage);
    await this.MessageSearchService.indexMessage(messageBody);
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
