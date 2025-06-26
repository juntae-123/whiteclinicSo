import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @Length(6, 100, { message: '비밀번호는 6자 이상 100자 이하로 입력해주세요.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  newPassword: string;
}
