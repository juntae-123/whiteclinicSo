import { Exclude } from 'class-transformer';
import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';

export class UserResponseDto {
  user_id: number;
  user_name: string;
  user_email: string;
  phone_no: string;
  reviews: Review[];
  reservations: Reservation[];
  inquiries: Inquiry[];

  @Exclude()
  user_password: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  deleted_at: Date;
  @Exclude()
  token_version: number;
}
