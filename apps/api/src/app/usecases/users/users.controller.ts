import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard, JwtAuthGuard, Roles } from '@app/shared';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Roles('users-list')
  @UseGuards(AuthorizeGuard)
  @Get()
  list(): Promise<UserResponseDto[]> {
    return this.service.list();
  }

  @Roles('users-create')
  @UseGuards(AuthorizeGuard)
  @Post()
  create(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return this.service.create(data);
  }

  @Roles('users-details')
  @UseGuards(AuthorizeGuard)
  @Get('/:id')
  find(@Param() { id }: UserDto): Promise<UserResponseDto> {
    return this.service.find(id);
  }

  @Roles('users-update')
  @UseGuards(AuthorizeGuard)
  @Put('/:id')
  update(
    @Param() { id }: UserDto,
    @Body() data: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.service.update(id, data);
  }

  @Roles('users-delete')
  @UseGuards(AuthorizeGuard)
  @Delete('/:id')
  destroy(@Param() { id }: UserDto): Promise<void> {
    return this.service.destroy(id);
  }
}
