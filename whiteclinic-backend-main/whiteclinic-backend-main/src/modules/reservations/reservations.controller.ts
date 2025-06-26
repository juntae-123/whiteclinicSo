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
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';
import { RequestWithUser } from '../auths/interfaces/request-with-user.interface';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyReservations(@Request() req: RequestWithUser) {
    console.log('사용자 예약 조회 요청:', req.user.user_id);
    const reservations = await this.reservationsService.findByUserId(req.user.user_id);
    console.log('조회된 예약:', reservations);
    return { success: true, data: reservations };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req: RequestWithUser,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    console.log('예약 생성 요청:', { userId: req.user.user_id, data: createReservationDto });
    
    try {
      const reservation = await this.reservationsService.create(
        createReservationDto,
        req.user.user_id,
      );
      console.log('예약 생성 성공:', reservation);
      return { success: true, data: reservation };
    } catch (error) {
      console.error('예약 생성 실패:', error);
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }

  // 사용자의 예약 목록 조회
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.reservationsService.findByUserId(+userId);
  }
}
