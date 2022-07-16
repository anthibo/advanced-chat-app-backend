import { Module } from '@nestjs/common';
import { RoomModule } from '../room/room.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [RoomModule],
  controllers: [],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
