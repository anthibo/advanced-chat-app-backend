import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MessageBody } from './dto/message.dto';

@Injectable()
export class MessageSearchService {
  private indexName = 'messages';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async indexMessage(messageBody: MessageBody) {
    const { from, message, roomName, time } = messageBody;
    const savedMessage = await this.elasticsearchService.index<MessageBody>({
      index: this.indexName,
      body: {
        from,
        message,
        roomName,
        time,
      },
    });
    return savedMessage;
  }

  listChatMessages() {
    return `This action returns all messages`;
  }

  searchMessage(id: number) {
    return `This action returns a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
