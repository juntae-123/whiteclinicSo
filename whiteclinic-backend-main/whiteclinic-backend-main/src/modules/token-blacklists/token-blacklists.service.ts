import { Injectable } from '@nestjs/common';
import { CreateTokenBlacklistDto } from './dto/create-token-blacklist.dto';
import { UpdateTokenBlacklistDto } from './dto/update-token-blacklist.dto';

@Injectable()
export class TokenBlacklistsService {
  create(createTokenBlacklistDto: CreateTokenBlacklistDto) {
    return 'This action adds a new tokenBlacklist';
  }

  findAll() {
    return `This action returns all tokenBlacklists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tokenBlacklist`;
  }

  update(id: number, updateTokenBlacklistDto: UpdateTokenBlacklistDto) {
    return `This action updates a #${id} tokenBlacklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} tokenBlacklist`;
  }
}
