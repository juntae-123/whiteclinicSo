import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 10, { message: '이름은 2자 이상 10자 이하로 입력해주세요.' })
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  user_name: string;

  @IsEmail({}, { message: '이메일 형식으로 입력해주세요.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  user_email: string;

  @IsString()
  @Length(6, 100, { message: '비밀번호는 6자 이상 100자 이하로 입력해주세요.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  user_password: string;

  @Matches(/^01[016789]\d{7,8}$/, {
    message: '하이픈 없이 올바른 한국 전화번호 형식이어야 합니다.',
  })
  @IsNotEmpty({ message: '전화번호를 입력해주세요.' })
  phone_no: string;

  @IsString()
  @IsOptional()
  adminCode?: string;

  @IsNumber()
  @IsOptional()
  is_admin?: number;
}
