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
import { User } from '../../domain/user.domain';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  list(): Promise<User[]> {
    return this.service.list();
  }

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @Get('/:id')
  find(@Param() { id: string }: UserDto): Promise<User> {
    return this.service.find(id);
  }

  @Put('/:id')
  update(
    @Param() { id: string }: UserDto,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.service.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() { id: string }: UserDto): Promise<void> {
    return this.service.destroy(id);
  }
}
