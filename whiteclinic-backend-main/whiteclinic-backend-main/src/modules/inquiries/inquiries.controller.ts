import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  async create(@Request() req, @Body() createInquiryDto: CreateInquiryDto) {
    try {
      console.log('문의 작성 요청:', { userId: req.user.user_id, dto: createInquiryDto });
      
      const inquiry = await this.inquiriesService.create(
        createInquiryDto,
        req.user.user_id,
      );
      
      console.log('문의 작성 성공:', inquiry);
      
      return {
        message: '문의가 성공적으로 등록되었습니다.',
        inquiry,
      };
    } catch (error) {
      console.error('문의 작성 오류:', error);
      return {
        message: error.message,
      };
    }
  }

  @Get('my')
  async getMyInquiries(@Request() req) {
    try {
      console.log('문의 조회 요청:', { userId: req.user.user_id });
      const inquiries = await this.inquiriesService.findByUserId(req.user.user_id);
      console.log('문의 조회 결과:', inquiries);
      return inquiries;
    } catch (error) {
      console.error('문의 조회 오류:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.inquiriesService.findOne(+id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateInquiryDto: UpdateInquiryDto,
  // ) {
  //   return this.inquiriesService.update(+id, updateInquiryDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.inquiriesService.remove(+id);
  }
}
