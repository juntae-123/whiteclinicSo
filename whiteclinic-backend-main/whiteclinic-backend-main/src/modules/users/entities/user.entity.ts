import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { RefreshToken } from 'src/modules/auths/entities/refresh-token.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  user_name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  user_email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  user_password: string;

  @Column({ type: 'varchar', length: 11, nullable: true, unique: true })
  phone_no: string | null;

  @Column({ default: 0 })
  is_admin: number;

  @Column({ type: 'varchar', nullable: true, default: 'local' })
  provider: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // soft delete용
  @DeleteDateColumn()
  deleted_at: Date | null;

  @Column({ default: 0 })
  token_version: number;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Inquiry, (inquiry) => inquiry.user)
  inquiries: Inquiry[];

  @OneToMany(() => RefreshToken, (token) => token.user, { cascade: ['remove'] })
  refreshTokens: RefreshToken[];
}
