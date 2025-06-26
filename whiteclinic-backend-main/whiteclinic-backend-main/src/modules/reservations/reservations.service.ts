import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    userId: number,
  ): Promise<Reservation> {
    console.log('예약 생성 요청:', { ...createReservationDto, userId });
    
    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      user_id: userId,
      agree_personal_info: createReservationDto.agree_personal_info ?? true,
      status: 'pending',
    });
    
    const savedReservation = await this.reservationsRepository.save(reservation);
    console.log('예약 생성 완료:', savedReservation);
    
    return savedReservation;
  }

  async findByUserId(userId: number): Promise<Reservation[]> {
    console.log('예약 조회 시작 - 사용자 ID:', userId);
    
    try {
      const reservations = await this.reservationsRepository.find({
        where: { user_id: userId },
        order: { created_at: 'DESC' },
      });
      
      console.log('데이터베이스에서 조회된 예약:', reservations);
      console.log('조회된 예약 개수:', reservations.length);
      
      if (reservations.length > 0) {
        console.log('첫 번째 예약 상세:', {
          id: reservations[0].reservation_id,
          service_type: reservations[0].service_type,
          content: reservations[0].content,
          created_at: reservations[0].created_at,
          status: reservations[0].status
        });
      }
      
      return reservations;
    } catch (error) {
      console.error('예약 조회 중 오류:', error);
      throw error;
    }
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { reservation_id: id },
    });
    if (!reservation) {
      throw new NotFoundException(`예약 ID ${id}을(를) 찾을 수 없습니다`);
    }
    return reservation;
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);
    Object.assign(reservation, updateReservationDto);
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservationsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`예약 ID ${id}을(를) 찾을 수 없습니다`);
    }
  }
}
