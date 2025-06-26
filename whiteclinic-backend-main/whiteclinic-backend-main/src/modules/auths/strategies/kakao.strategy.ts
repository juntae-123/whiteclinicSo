import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_REDIRECT_URI,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, _json } = profile;

    const nickname = _json?.kakao_account?.profile?.nickname;
    const email = _json?.kakao_account?.email;

    if (!nickname) {
      return done(
        new Error(
          '카카오 닉네임 정보를 가져올 수 없습니다. 프로필 제공에 동의해주세요.',
        ),
      );
    }

    if (!email) {
      // email 동의 안한 경우 처리
      return done(
        new Error('카카오 이메일 정보가 없습니다. 이메일 제공에 동의해주세요.'),
        false,
      );
    }

    const user = {
      kakaoId: id,
      nickname,
      email,
      provider: 'kakao',
    };

    return done(null, user);
  }
}
