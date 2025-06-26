import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 리뷰 작성
  async create(createReviewDto: CreateReviewDto, userId: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
    });

    if (!review) {
      throw new Error('입력란을 확인해주세요.');
    }
    await this.reviewRepository.save(review);
    return review;
  }

  // 리뷰 모두 조회
  async findAllReview() {
    const reviews = await this.reviewRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
    return reviews;
  }

  // 리뷰 상세 조회
  async findReviewDetail(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id },
      relations: ['user', 'comments'],
    });
    if (!review) {
      throw new NotFoundException('해당 리뷰를 찾을 수 없습니다.');
    }

    return review;
  }

  // 리뷰 삭제
  async removeReview(id: number, user_id: number) {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id },
      relations: ['user'],
    });
    if (!review) {
      throw new NotFoundException('해당 리뷰를 찾을 수 없습니다.');
    }
    if (review.user.user_id !== user_id) {
      throw new NotFoundException('해당 리뷰를 삭제할 권한이 없습니다.');
    }
    await this.reviewRepository.remove(review);
    return review;
  }

  // 좋아요 기능
  async increaseLikeReview(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id },
    });
    if (!review) {
      throw new NotFoundException('해당 리뷰를 찾을 수 없습니다.');
    }
    review.likes += 1;
    return this.reviewRepository.save(review);
  }

  // 조회수 증가
  async increaseViewReview(id: number) {
    const review = await this.reviewRepository.findOne({
      where: { review_id: id },
    });
    if (!review) {
      throw new NotFoundException('해당 리뷰를 찾을 수 없습니다.');
    }
    review.views += 1;
    return this.reviewRepository.save(review);
  }

  // 사용자별 리뷰 조회
  async findByUserId(userId: number) {
    const reviews = await this.reviewRepository.find({
      where: { user: { user_id: userId } },
      order: { created_at: 'DESC' },
    });
    return reviews;
  }
}
