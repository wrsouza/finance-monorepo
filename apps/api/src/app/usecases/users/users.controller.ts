import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  list(): Promise<UserResponseDto[]> {
    return this.service.list();
  }

  @Post()
  create(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return this.service.create(data);
  }

  @Get('/:id')
  find(@Param() { id }: UserDto): Promise<UserResponseDto> {
    return this.service.find(id);
  }

  @Put('/:id')
  update(
    @Param() { id }: UserDto,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.service.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() { id }: UserDto): Promise<void> {
    return this.service.destroy(id);
  }
}
