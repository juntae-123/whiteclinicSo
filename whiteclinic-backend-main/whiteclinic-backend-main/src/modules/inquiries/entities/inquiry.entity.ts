import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum InquiryServiceType {
  예약관련 = '예약관련',
  세탁기청소 = '세탁기청소',
}
export enum InquiryStatus {
  대기 = '대기',
  완료 = '완료',
}

@Entity('inquiries')
export class Inquiry {
  @PrimaryGeneratedColumn()
  inquiry_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: InquiryServiceType })
  service_type: InquiryServiceType;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'boolean', default: false })
  privacy_agreement: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'enum', enum: InquiryStatus, default: InquiryStatus.대기 })
  status: InquiryStatus;
}
