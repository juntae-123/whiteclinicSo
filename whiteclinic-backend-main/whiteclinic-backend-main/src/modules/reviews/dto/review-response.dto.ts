import { Exclude, Expose, Type } from 'class-transformer';

export class ReviewUserDto {
  @Expose()
  user_id: number;

  @Expose()
  user_name: string;

  @Expose()
  user_email: string;

  @Expose()
  phone_no: string;

  @Exclude()
  user_password: string;
  @Exclude()
  provider: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  @Exclude()
  deleted_at: Date;
  @Exclude()
  token_version: number;
}

export class ReviewResponseDto {
  @Expose()
  review_id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  image?: string;

  @Expose()
  views: number;

  @Expose()
  likes: number;

  @Expose()
  created_at: Date;

  @Expose()
  @Type(() => ReviewUserDto)
  user: ReviewUserDto;
}
