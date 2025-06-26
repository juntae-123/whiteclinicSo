import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiriesRepository: Repository<Inquiry>,
  ) {}

  async create(
    createInquiryDto: CreateInquiryDto,
    userId: number,
  ): Promise<Inquiry> {
    const inquiry = this.inquiriesRepository.create({
      ...createInquiryDto,
      user_id: userId,
    });
    return this.inquiriesRepository.save(inquiry);
  }

  async findAll(): Promise<Inquiry[]> {
    return this.inquiriesRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findByUserId(userId: number): Promise<Inquiry[]> {
    return this.inquiriesRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Inquiry> {
    const inquiry = await this.inquiriesRepository.findOne({
      where: { inquiry_id: id },
    });
    if (!inquiry) {
      throw new NotFoundException('문의를 찾을 수 없습니다.');
    }
    return inquiry;
  }

  // async update(
  //   id: number,
  //   updateInquiryDto: UpdateInquiryDto,
  // ): Promise<Inquiry> {
  //   const inquiry = await this.findOne(id);
  //   Object.assign(inquiry, updateInquiryDto);
  //   return this.inquiriesRepository.save(inquiry);
  // }

  async remove(id: number): Promise<void> {
    const result = await this.inquiriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('문의를 찾을 수 없습니다.');
    }
  }
}
