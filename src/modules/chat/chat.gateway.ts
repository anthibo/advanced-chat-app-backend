import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { RoomService } from '../room/room.service';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly roomService: RoomService) {}
  handleConnection(client: Socket) {
    console.log(client.handshake.auth);
    const username = client.handshake.auth.username;
    const userInboxRoom = `${username}-inbox`;
    client.join(userInboxRoom);
    console.log(`${username} is online`);
    return { event: 'roomCreated', room: userInboxRoom };
  }
  handleDisconnect(client: Socket) {
    console.log('user disconnected');
  }

  @SubscribeMessage('send message')
  handleNewMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: { roomName: string; message: string; time: string },
  ) {
    console.log(message.message);
    socket.to(message.roomName).emit('new message', {
      from: socket.handshake.auth.username,
      message: message.message,
      time: message.time,
    });
  }

  @SubscribeMessage('create private chat room')
  async createPrivateChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: { to: string; message: string },
  ) {
    // create a new room and persist users in db
    // join to the new created room
    // emit an event to the current socket to send back the name of the created room
    // emit a private message event

    console.log('create private chat room');
    const usersIds = [parseInt(socket.handshake.auth.id), parseInt(message.to)];
    console.log(usersIds);
    const { roomName, receiverUsername } =
      await this.roomService.createPrivateRoom(usersIds);
    socket.join(roomName);
    socket.emit('room:created', roomName);
    socket.to(roomName).emit('new message', {
      from: socket.handshake.auth.username,
      message: message.message,
      time: Date.now().toString(),
    });
    const receiverInboxRoom = `${receiverUsername}-inbox`;
    socket.to(receiverInboxRoom).emit('new chat', {
      from: socket.handshake.auth.username,
      message: message.message,
      time: Date.now().toString(),
    });
  }
  @SubscribeMessage('join private chat room')
  async joinPrivateChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() roomName: string,
  ) {
    // load missed messages from cache after u join the room
    socket.join(roomName);
    console.log(
      `user ${socket.handshake.auth.username} joined room ${roomName}`,
    );
  }
}
