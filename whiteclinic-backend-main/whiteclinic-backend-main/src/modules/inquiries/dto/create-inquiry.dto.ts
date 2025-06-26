import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { InquiryServiceType, InquiryStatus } from '../entities/inquiry.entity';

export class CreateInquiryDto {
  @IsEnum(InquiryServiceType)
  @IsNotEmpty({ message: '서비스 유형을 선택해주세요.' })
  service_type: InquiryServiceType;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  content: string;

  @IsBoolean()
  @IsNotEmpty({ message: '개인정보 수집 및 이용에 동의해주세요.' })
  privacy_agreement: boolean;

  @IsEnum(InquiryStatus)
  @IsOptional()
  @IsEmpty()
  status?: InquiryStatus;
}
