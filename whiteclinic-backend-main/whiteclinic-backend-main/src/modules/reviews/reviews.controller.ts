import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { ReviewResponseDto } from './dto/review-response.dto';
import { RequestWithUser } from '../auths/interfaces/request-with-user.interface';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req['user']?.user_id;
    const result = await this.reviewsService.create(createReviewDto, userId);
    const data = plainToInstance(ReviewResponseDto, result);
    return { data, message: '리뷰가 성공적으로 작성되었습니다.' };
  }

  @Get()
  async findAll() {
    const reviews = await this.reviewsService.findAllReview();
    const data = plainToInstance(ReviewResponseDto, reviews);
    return { data, message: '리뷰 목록이 성공적으로 조회되었습니다.' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyReviews(@Req() req: RequestWithUser) {
    try {
      console.log('리뷰 조회 요청:', { userId: req.user.user_id });
      const reviews = await this.reviewsService.findByUserId(req.user.user_id);
      console.log('리뷰 조회 결과:', reviews);
      return reviews;
    } catch (error) {
      console.error('리뷰 조회 오류:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewsService.findReviewDetail(+id);
    const data = plainToInstance(ReviewResponseDto, review);
    return { data, message: '리뷰 상세 정보가 성공적으로 조회되었습니다.' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const userId = req['user']?.user_id;
    await this.reviewsService.removeReview(+id, userId);
    return { message: '리뷰가 성공적으로 삭제되었습니다.' };
  }

  @Patch(':id/like')
  increaseLikes(@Param('id') id: number) {
    return this.reviewsService.increaseLikeReview(id);
  }

  @Patch(':id/view')
  increaseViews(@Param('id') id: number) {
    return this.reviewsService.increaseViewReview(id);
  }
}
