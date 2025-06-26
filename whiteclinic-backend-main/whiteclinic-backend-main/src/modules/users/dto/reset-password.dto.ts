import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: '이메일 형식으로 입력해주세요.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  user_email: string;

  @IsString()
  @Length(6, 100, { message: '비밀번호는 6자 이상 100자 이하로 입력해주세요.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  new_password: string;
}
