import { IsString, IsOptional, Length, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @Length(1, 100, { message: '제목은 1자 이상 100자 이하로 입력해주세요.' })
  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  title: string;

  @IsString()
  @Length(5, 500, { message: '제목은 1자 이상 500자 이하로 입력해주세요.' })
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  content: string;

  @IsOptional()
  @IsString()
  image?: string;
}
