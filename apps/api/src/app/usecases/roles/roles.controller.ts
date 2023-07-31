import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { RoleResponseDto } from './dto/role-response.dto';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';

@ApiTags('Roles')
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
