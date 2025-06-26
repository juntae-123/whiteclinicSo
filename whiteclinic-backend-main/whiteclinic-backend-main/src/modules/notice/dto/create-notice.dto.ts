import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  notice_title: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  notice_content: string;
}
