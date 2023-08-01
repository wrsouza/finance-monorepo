import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto, ValidateResponseDto } from './dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@app/shared';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  async doLogin(@Body() data: LoginDto): Promise<LoginResponseDto> {
    return this.service.doLogin(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async validate(@Request() { user }): Promise<ValidateResponseDto> {
    return user;
  }
}
