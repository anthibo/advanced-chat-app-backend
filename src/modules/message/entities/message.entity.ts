import { Room } from 'src/modules/room/entities/chat-room.entity';
import { User } from 'src/modules/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, 'sender_id')
  sender: User;

  @Column()
  message: string;

  @ManyToOne(() => Room)
  room: Room;

  @Column()
  time: string;
}
