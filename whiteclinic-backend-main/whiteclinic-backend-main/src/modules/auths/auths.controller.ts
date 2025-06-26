import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthsService } from './services/auths.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  // sign up post 함수
  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authsService.signup(signupDto);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    return { accessToken, message: '회원가입 완료' };
  }

  // login post 함수
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authsService.login(loginDto);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    return { accessToken, refreshToken, message: '로그인 완료' };
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  async logout(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = req.get('authorization')?.split(' ')[1];
    const refreshToken = req.cookies['refreshToken'];
    if (accessToken && refreshToken) {
      await this.authsService.logout(accessToken, refreshToken);
    }
    res.clearCookie('refreshToken');
    return { message: '로그아웃 완료' };
  }

  // 리프레시 토큰 재발급 API
  @Post('refresh-token')
  @UseGuards(JwtRefreshGuard)
  async refreshAccessToken(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    const { accessToken, refreshToken: newRefreshToken } =
      await this.authsService.refreshTokens(refreshToken);
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    return { accessToken, refreshToken, message: '토큰 재발급 완료' };
  }

  // api/auths/login/google => 구글 로그인 리다이렉트됨 (자동으로)
  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  // 구글 로그인 리다이렉트
  @Get('login/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authsService.validateOAuthLogin(req.user, 'google');
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    // return 없이!
    res.redirect(
      `http://localhost:3000/socialRedirect?accessToken=${accessToken}`,
    );
    return { accessToken, message: 'Google 로그인 완료' };
  }

  // api/auths/login/kakao => 카카오 로그인 리다이렉트됨 (자동으로)
  @Get('login/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {}

  // 카카오 로그인 리다이렉트
  @Get('login/kakao/redirect')
  @UseGuards(KakaoAuthGuard)
  async kakaoRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authsService.validateOAuthLogin(req.user, 'kakao');
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    res.redirect(
      `http://localhost:3000/socialRedirect?accessToken=${accessToken}`,
    );
    return { accessToken, message: 'Kakao 로그인 완료' };
  }
}
