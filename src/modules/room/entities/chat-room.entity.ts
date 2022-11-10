import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoomParticipant } from './room-participant.entity';

enum ROOM_TYPE {
  PRIVATE = 'private',
  GROUP = 'group',
}
@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => RoomParticipant, (roomParticipant) => roomParticipant.room, {
    eager: true,
  })
  roomParticipants: RoomParticipant[];
  @Column({ type: 'enum', enum: ROOM_TYPE, default: ROOM_TYPE.PRIVATE })
  type: ROOM_TYPE;
}
