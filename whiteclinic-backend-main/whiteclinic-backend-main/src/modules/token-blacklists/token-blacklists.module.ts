import { Module } from '@nestjs/common';
import { TokenBlacklistsService } from './token-blacklists.service';
import { TokenBlacklistsController } from './token-blacklists.controller';

@Module({
  controllers: [TokenBlacklistsController],
  providers: [TokenBlacklistsService],
})
export class TokenBlacklistsModule {}
