import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '../auths/guards/jwt-auth.guard';
import { RequestWithUser } from '../auths/interfaces/request-with-user.interface';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { FindEmailDto } from './dto/find-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const data = plainToInstance(UserResponseDto, user);
    return { data, message: '회원가입이 완료되었습니다.' };
  }

  // 유저 => jwt
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Req() req: RequestWithUser) {
    const userId = req.user.user_id;
    const user = await this.usersService.getUser(userId);
    const data = plainToInstance(UserResponseDto, user);
    return { data, message: `내 정보 조회 완료` };
  }

  // 유저 정보 업데이트(이메일, 전화번호, 이름) / 비밀번호는 따로
  // 일반 토큰이 되면 되는거고 안되면 리프레시 토큰으로 해야함
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateUserInfo(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.user_id;
    const user = await this.usersService.updateUserInfo(userId, updateUserDto);
    const data = plainToInstance(UserResponseDto, user);
    return { data, message: '회원 정보가 수정되었습니다.' };
  }

  // 로그인 상태 => 비밀번호 변경
  // 현재 비밀번호 입력 -> 새 비밀번호 변경
  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async changePassword(
    @Req() req: RequestWithUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user.user_id;
    const user = await this.usersService.changePassword(
      userId,
      changePasswordDto,
    );
    const data = plainToInstance(UserResponseDto, user);
    return { data, message: '비밀번호가 변경되었습니다.' };
  }

  // 이메일 찾기
  @Post('find-email')
  async findEmail(@Body() findEmailDto: FindEmailDto) {
    const email = await this.usersService.findEmailByPhone(findEmailDto);
    return { email, message: '이메일 찾기 완료' };
  }

  // 비밀번호 재설정(비로그인)(추후 이메일 인증과 토큰 검증 구현)
  @Post('reset-password')
  async resetPasswrod(@Body() resetPasswordDto: ResetPasswordDto) {
    const { user_email, new_password } = resetPasswordDto;
    const user = await this.usersService.resetPassword(
      user_email,
      new_password,
    );
    const data = plainToInstance(UserResponseDto, user);
    return { data, message: '비밀번호가 성공적으로 재설정되었습니다.' };
  }

  // 회원탈퇴 => 회원 삭제
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async remove(@Req() req: RequestWithUser) {
    const userId = req.user.user_id;
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('RefreshToken이 헤더에 없습니다.');
    }
    await this.usersService.remove(userId, refreshToken);
    return {
      message: '회원 탈퇴가 완료되었습니다.',
    };
  }
}
