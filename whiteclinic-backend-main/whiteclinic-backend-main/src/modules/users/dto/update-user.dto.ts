import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(2, 10, { message: '이름은 2자 이상 10자 이하로 입력해주세요.' })
  user_name?: string;

  @IsOptional()
  @IsEmail({}, { message: '이메일 형식으로 입력해주세요.' })
  user_email?: string;

  @IsOptional()
  @Matches(/^01[016789]\d{7,8}$/, {
    message: '하이픈 없이 올바른 한국 전화번호 형식이어야 합니다.',
  })
  phone_no?: string;
}
