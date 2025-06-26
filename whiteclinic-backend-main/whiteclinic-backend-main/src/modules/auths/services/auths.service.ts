import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from '../dto/signup.dto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../users/entities/user.entity';
import { TokenService } from './token.service';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private tokenservice: TokenService,
  ) {}

  // 회원가입
  async signup(signupDto: SignupDto) {
    const { user_email, user_password, phone_no, user_name } = signupDto;
    const existingUser = await this.userRepository.findOne({
      where: { user_email },
      withDeleted: true,
    });

    if (existingUser) {
      if (!existingUser.deleted_at) {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      } else {
        throw new ConflictException(
          '삭제된 계정입니다. 복구를 원하시면 고객센터에 문의해주세요.',
        );
      }
    }

    const isExistPhoneNo = await this.userRepository.findOne({
      where: { phone_no },
    });
    if (isExistPhoneNo)
      throw new ConflictException('전화번호가 이미 존재합니다.');

    const hashedPW = await hash(user_password, 10);

    const newUser = await this.userRepository.create({
      user_email,
      user_password: hashedPW,
      phone_no,
      user_name,
    });
    const result = await this.userRepository.save(newUser);
    const token = await this.tokenservice.generateToken(result);
    return token;
  }

  // 로그인
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const token = await this.tokenservice.generateToken(user);
    return token;
  }

  // 유저 정보 검증
  async validateUser(loginDto: LoginDto) {
    const { user_email, user_password } = loginDto;

    const userInfo = await this.userRepository.findOne({
      where: { user_email },
    });

    if (!userInfo)
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');

    const isSame = await compare(user_password, userInfo.user_password);
    if (!isSame)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    return userInfo;
  }

  // 로그아웃
  // accessToken, refreshToken을 블랙리스트에 추가하고, refreshToken을 만료시킴
  async logout(accessToken: string, refreshToken: string): Promise<void> {
    await this.tokenservice.addToBlacklist(accessToken);
    await this.tokenservice.revokeRefreshToken(refreshToken);
  }

  // 리프레시 토큰 재발급
  // refreshToken을 검증하고, 유저 정보를 가져와서 새 accessToken과 refreshToken을 발급
  async refreshTokens(refreshToken: string) {
    const isBlacklisted = await this.tokenservice.isBlacklisted(refreshToken);
    if (isBlacklisted) {
      throw new UnauthorizedException(
        '블랙리스트에 등록된 RefreshToken입니다.',
      );
    }

    const payload = await this.tokenservice.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findOne({
      where: { user_id: payload.user_id },
    });

    if (!user) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }

    if (user.token_version !== payload.token_version) {
      throw new UnauthorizedException('토큰 버전 불일치');
    }

    return await this.tokenservice.generateToken(user);
  }

  // OAuth 로그인 검증
  // OAuth provider에서 받은 프로필 정보를 기반으로 유저를 찾거나 새로 생성하고 토큰을 발급
  async validateOAuthLogin(profile: any, provider: string) {
    const { email, nickname } = profile;

    let user = await this.userRepository.findOne({
      where: { user_email: email },
      withDeleted: true,
    });

    if (user?.deleted_at) {
      throw new ConflictException(
        '삭제된 계정입니다. 복구를 원하시면 고객센터에 문의해주세요.',
      );
    }

    if (!user) {
      user = this.userRepository.create({
        user_email: email,
        user_name: nickname,
        provider,
      });
      await this.userRepository.save(user);
    }

    return this.tokenservice.generateToken(user);
  }
}
