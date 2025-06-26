import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ServiceType {
  에어컨 = '에어컨',
  세탁기 = '세탁기',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: ServiceType })
  service_type: ServiceType;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @Column({ type: 'boolean' })
  agree_personal_info: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  detail_address: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  zipcode: string;
}
