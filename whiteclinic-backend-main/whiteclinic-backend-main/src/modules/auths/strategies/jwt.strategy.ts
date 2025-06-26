import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { TokenService } from '../services/token.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
      passReqToCallback: true, // 꼭 필요
    });
  }

  async validate(req: Request, payload: any) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const isBlacklisted = await this.tokenService.isBlacklisted(token);

    if (isBlacklisted) {
      throw new UnauthorizedException('블랙리스트에 등록된 토큰입니다.');
    }

    const user = await this.usersService.getUser(payload.user_id);

    if (!user || user.token_version !== payload.token_version) {
      throw new UnauthorizedException('토큰이 만료되었습니다.');
    }

    return {
      user_id: user.user_id,
      user_email: user.user_email,
    };
  }
}
