import { Module } from '@nestjs/common';
import { AuthsService } from './services/auths.service';
import { AuthsController } from './auths.controller';
import { TokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { TokenBlacklist } from '../token-blacklists/entities/token-blacklist.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, TokenBlacklist, RefreshToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthsController],
  providers: [
    AuthsService,
    TokenService,
    UsersService,
    JwtStrategy,
    GoogleStrategy,
    KakaoStrategy,
    JwtRefreshStrategy,
  ],
  exports: [TokenService],
})
export class AuthsModule {}
