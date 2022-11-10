import { OmitType, PickType } from '@nestjs/mapped-types';

export class MessageDTO {
  from: string;
  message: string;
  time: string;
  roomName: string;
  to: string;
}

export class SendMessageBodyDTO extends OmitType(MessageDTO, [
  'to',
  'from',
] as const) {}

export class CreateMessageDTO extends OmitType(MessageDTO, ['to'] as const) {}
export class MessageBody extends CreateMessageDTO {}

export class CreateChatRoomDTO extends PickType(MessageDTO, [
  'to',
  'message',
] as const) {}

export interface MessageSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: MessageBody;
    }>;
  };
}
