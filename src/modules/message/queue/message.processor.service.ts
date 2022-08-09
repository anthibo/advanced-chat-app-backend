import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateMessageDTO } from '../dto/message.dto';
import { MessageService } from '../message.service';

@Processor('messages-queue')
export class MessageProcessor {
  constructor(private readonly messageService: MessageService) {}
  @Process('save-message')
  async saveMessage(job: Job<CreateMessageDTO>) {
    console.log('save message job is running');
    await this.messageService.saveMessage(job.data);
  }
}
