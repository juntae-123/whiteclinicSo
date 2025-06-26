import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokenBlacklistsService } from './token-blacklists.service';
import { CreateTokenBlacklistDto } from './dto/create-token-blacklist.dto';
import { UpdateTokenBlacklistDto } from './dto/update-token-blacklist.dto';

@Controller('token-blacklists')
export class TokenBlacklistsController {
  constructor(private readonly tokenBlacklistsService: TokenBlacklistsService) {}

  @Post()
  create(@Body() createTokenBlacklistDto: CreateTokenBlacklistDto) {
    return this.tokenBlacklistsService.create(createTokenBlacklistDto);
  }

  @Get()
  findAll() {
    return this.tokenBlacklistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenBlacklistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenBlacklistDto: UpdateTokenBlacklistDto) {
    return this.tokenBlacklistsService.update(+id, updateTokenBlacklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenBlacklistsService.remove(+id);
  }
}
