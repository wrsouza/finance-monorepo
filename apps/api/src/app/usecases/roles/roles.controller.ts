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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { RoleResponseDto } from './dto/role-response.dto';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';
import { JwtAuthGuard } from '@app/shared';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  list(): Promise<RoleResponseDto[]> {
    return this.service.list();
  }

  @Post()
  create(@Body() data: CreateRoleDto): Promise<RoleResponseDto> {
    return this.service.create(data);
  }

  @Get('/:id')
  find(@Param() { id }: RoleDto): Promise<RoleResponseDto> {
    return this.service.find(id);
  }

  @Put('/:id')
  update(
    @Param() { id }: RoleDto,
    @Body() data: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.service.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() { id }: RoleDto): Promise<void> {
    return this.service.destroy(id);
  }
}
