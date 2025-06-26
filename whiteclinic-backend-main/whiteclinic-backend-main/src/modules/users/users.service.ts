import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { compare, hash } from 'bcrypt';
import { FindEmailDto } from './dto/find-email.dto';
import { TokenService } from '../auths/services/token.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly ADMIN_CODE = process.env.ADMIN_CODE;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // 관리자 코드 확인
    if (createUserDto.adminCode) {
      if (createUserDto.adminCode !== this.ADMIN_CODE) {
        throw new UnauthorizedException('잘못된 관리자 코드입니다.');
      }
      createUserDto.is_admin = 1;
    } else {
      createUserDto.is_admin = 0;
    }

    // 비밀번호 해시화
    const hashedPassword = await hash(createUserDto.user_password, 10);

    // 사용자 생성
    const user = this.userRepository.create({
      ...createUserDto,
      user_password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // 유저 한 명 조회
  getUser(user_id: number) {
    return this.userRepository.findOne({
      where: { user_id },
      relations: ['reviews', 'reservations', 'inquiries'],
    });
  }

  // 회원 정보 수정(이메일, 전화번호, 이름)
  async updateUserInfo(user_id: number, updateUserDto: UpdateUserDto) {
    if (!user_id) {
      throw new BadRequestException('user_id가 없습니다.');
    }

    const { user_email, phone_no } = updateUserDto;

    if (user_email) {
      const isExistEmail = await this.userRepository.findOne({
        where: { user_email },
      });
      if (isExistEmail && isExistEmail.user_id !== user_id) {
        throw new ConflictException('이미 등록된 이메일입니다.');
      }
    }

    if (phone_no) {
      const isExistPhoneNo = await this.userRepository.findOne({
        where: { phone_no },
      });
      if (isExistPhoneNo && isExistPhoneNo.user_id !== user_id) {
        throw new ConflictException('이미 등록된 전화번호입니다.');
      }
    }

    await this.userRepository.update(user_id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ user_id });
    return updatedUser;
  }

  // 로그인 했을때 비번 변경
  async changePassword(user_id: number, changePasswordDto: ChangePasswordDto) {
    const { currentPassword, newPassword } = changePasswordDto;
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const isSame = await compare(currentPassword, user.user_password);
    if (!isSame) {
      throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
    }
    user.user_password = await hash(newPassword, 10);
    user.token_version = (user.token_version || 0) + 1;
    const changedPasswordUser = await this.userRepository.save(user);
    return changedPasswordUser;
  }

  async findEmailByPhone(findEmailDto: FindEmailDto) {
    const { user_name, phone_no } = findEmailDto;
    const user = await this.userRepository.findOne({
      where: { user_name, phone_no },
    });
    if (!user) {
      throw new NotFoundException('일치하는 회원 정보를 찾을 수 없습니다.');
    }
    return user.user_email;
  }

  // 인증 완료 후 비밀번호 변경
  async resetPassword(email: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { user_email: email },
    });
    if (!user) {
      throw new NotFoundException('등록된 이메일이 없습니다.');
    }
    user.user_password = await hash(newPassword, 10);
    user.token_version = (user.token_version || 0) + 1; // 토큰 무효화용 버전 증가
    return this.userRepository.save(user);
  }

  // 회원 탈퇴
  async remove(user_id: number, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
    }

    if (await this.tokenService.isBlacklisted(refreshToken)) {
      throw new UnauthorizedException('블랙리스트 된 토큰입니다.');
    }
    await this.tokenService.addToBlacklist(refreshToken);
    await this.tokenService.revokeRefreshToken(refreshToken);

    await this.userRepository.update(user_id, { phone_no: null });
    return this.userRepository.softDelete(user_id);
  }
}
