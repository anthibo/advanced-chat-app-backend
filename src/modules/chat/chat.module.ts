import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { RoomModule } from '../room/room.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [RoomModule, MessageModule],
  controllers: [],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
