import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RefreshToken } from 'src/modules/auths/entities/refresh-token.entity';
import { Inquiry } from 'src/modules/inquiries/entities/inquiry.entity';
import { Notice } from 'src/modules/notice/entities/notice.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { TokenBlacklist } from 'src/modules/token-blacklists/entities/token-blacklist.entity';
import { User } from 'src/modules/users/entities/user.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Review,
    Reservation,
    Inquiry,
    Notice,
    TokenBlacklist,
    RefreshToken,
  ],
  synchronize: true,
};
