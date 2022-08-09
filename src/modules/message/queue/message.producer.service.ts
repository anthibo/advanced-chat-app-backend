import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { CreateMessageDTO } from '../dto/message.dto';

@Injectable()
export class MessageProducer {
  constructor(
    @InjectQueue('messages-queue') private readonly messagesQueue: Queue,
  ) {}
  async addToSaveMessageJob(message: CreateMessageDTO) {
    const job = await this.messagesQueue.add('save-message', message);
    console.log(job.name);
  }
}
