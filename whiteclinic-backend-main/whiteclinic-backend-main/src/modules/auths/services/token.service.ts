import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { TokenBlacklist } from 'src/modules/token-blacklists/entities/token-blacklist.entity';
import * as ms from 'ms';
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(TokenBlacklist)
    private readonly blacklistRepository: Repository<TokenBlacklist>,
  ) {}

  // AccessToken/RefreshToken 발급
  async generateToken(user: User) {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  // AccessToken 발급
  async generateAccessToken(user: User) {
    const payload = {
      user_id: user.user_id,
      token_version: user.token_version,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
  }

  // RefreshToken 발급
  async generateRefreshToken(user: User) {
    const payload = {
      user_id: user.user_id,
      token_version: user.token_version,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
    const expiresAt = new Date(Date.now() + ms(expiresIn));

    // 기존 토큰 제거 (중복 방지)
    await this.refreshTokenRepository.delete({
      user: { user_id: user.user_id },
    });

    await this.refreshTokenRepository.save({
      token: refreshToken,
      expiresAt,
      user,
    });
    return refreshToken;
  }

  // AccessToken 유효성 검증
  async verifyAccessToken(token: string) {
    try {
      const isBlacklisted = await this.blacklistRepository.findOneBy({ token });
      if (isBlacklisted) {
        throw new UnauthorizedException('블랙리스트에 등록된 토큰입니다.');
      }
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('유효하지 않은 AccessToken 입니다.');
    }
  }

  // RefreshToken 유효성 검증
  async verifyRefreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const storedToken = await this.refreshTokenRepository.findOneBy({
        token,
      });
      if (!storedToken) {
        throw new UnauthorizedException('RefreshToken을 찾을 수 없습니다.');
      }
      if (storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('RefreshToken이 만료되었습니다.');
      }
      return payload;
    } catch (err) {
      throw new UnauthorizedException('유효하지 않은 RefreshToken 입니다.');
    }
  }

  // RefreshToken 폐기
  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.delete({ token });
  }

  // RefreshToken 저장 및 중복 제거
  async deleteRefreshTokenByUserId(user_id: number): Promise<void> {
    await this.refreshTokenRepository.delete({ user: { user_id } });
  }

  // AccessToken 블랙리스트 추가
  async addToBlacklist(token: string): Promise<void> {
    try {
      const decoded: any = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const expired_at = new Date(decoded.exp * 1000);
      const blacklist = this.blacklistRepository.create({
        token,
        expired_at,
      });

      await this.blacklistRepository.save(blacklist);
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 AccessToken입니다.');
    }
  }

  // 블랙리스트 조회
  async isBlacklisted(token: string): Promise<boolean> {
    const found = await this.blacklistRepository.findOne({ where: { token } });
    return !!found;
  }
}
