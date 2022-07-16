import { Entity, ManyToOne } from 'typeorm';
import { Room } from './chat-room.entity';
import { User } from 'src/modules/user/user.entity';

@Entity()
export class RoomParticipant {
  @ManyToOne(() => Room, { nullable: false, primary: true })
  room: Room;

  @ManyToOne(() => User, { nullable: false, primary: true, eager: true })
  user: User;
}
