import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import { Notice } from 'src/modules/notice/entities/notice.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'whiteclinic',
  entities: [User, Reservation, Inquiry, Review, Comment, Notice],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
