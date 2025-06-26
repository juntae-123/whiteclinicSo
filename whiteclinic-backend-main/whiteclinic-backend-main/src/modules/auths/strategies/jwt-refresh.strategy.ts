import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const token = req.cookies?.refreshToken;

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
