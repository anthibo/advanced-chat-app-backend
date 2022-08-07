import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDTO } from './dto/message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: MessageDTO) {
    return this.messageService.saveMessage(createMessageDto);
  }

  @Get(':roomId')
  listChatMessages() {
    return this.messageService.listChatMessages();
  }

  @Get(':id')
  search(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }
}
