import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TokenBlacklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'datetime' })
  expired_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
