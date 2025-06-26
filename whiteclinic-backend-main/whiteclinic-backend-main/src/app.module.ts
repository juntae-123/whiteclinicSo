// .env 파일 환경변수 로드 -> process.env로 사용
import * as dotenv from 'dotenv';
dotenv.config();

import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ormConfig } from './config/orm.config';
import { AuthsModule } from './modules/auths/auths.module';
import { NoticeModule } from './modules/notice/notice.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TokenBlacklistsModule } from './modules/token-blacklists/token-blacklists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    ReviewsModule,
    ReservationsModule,
    InquiriesModule,
    NoticeModule,
    AuthsModule,
    TokenBlacklistsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
