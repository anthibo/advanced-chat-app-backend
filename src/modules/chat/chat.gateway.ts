import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('private message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any,
  ) {
    console.log(socket.handshake.auth.token);
    console.log(message.message);
    // socket.to(`${message.to}-inbox`).emit('new message', {
    //   from: socket.handshake.auth.username,
    //   message: message.message,
    // });
  }
  @SubscribeMessage('inbox-room')
  createInboxRoom(@ConnectedSocket() socket: Socket) {
    console.log(socket.handshake.auth);
    const username = socket.handshake.auth.username;
    const userInboxRoom = `${username}-inbox`;
    socket.join(userInboxRoom);
    console.log(`${username} is online`);
    return { event: 'roomCreated', room: userInboxRoom };
  }
}
