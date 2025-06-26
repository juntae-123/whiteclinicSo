import {
  IsInt,
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { ServiceType } from '../entities/reservation.entity';

export class CreateReservationDto {
  @IsEnum(ServiceType)
  @IsNotEmpty({ message: '서비스 타입을 선택해주세요.' })
  service_type: ServiceType;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  agree_personal_info?: boolean;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  address?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  detail_address?: string;

  @IsString()
  @IsOptional()
  @Length(1, 6)
  zipcode?: string;
}
