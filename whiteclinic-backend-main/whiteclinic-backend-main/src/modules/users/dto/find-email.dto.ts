import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class FindEmailDto {
  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  user_name: string;

  @Matches(/^01[016789]\d{7,8}$/, {
    message: '하이픈 없이 올바른 한국 전화번호 형식이어야 합니다.',
  })
  @IsNotEmpty({ message: '전화번호를 입력해주세요.' })
  phone_no: string;
}
