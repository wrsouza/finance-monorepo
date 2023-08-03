import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import {
  CreateRoleDto,
  RoleDto,
  UpdateRoleDto,
  UpdateRolePermissionsDto,
  RoleResponseDto,
} from './dto';
import { AuthorizeGuard, JwtAuthGuard, Roles } from '@app/shared';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Roles('roles-list')
  @UseGuards(AuthorizeGuard)
  @Get()
  list(): Promise<RoleResponseDto[]> {
    return this.service.list();
  }

  @Roles('roles-create')
  @UseGuards(AuthorizeGuard)
  @Post()
  create(@Body() data: CreateRoleDto): Promise<RoleResponseDto> {
    return this.service.create(data);
  }

  @Roles('roles-details')
  @UseGuards(AuthorizeGuard)
  @Get('/:id')
  find(@Param() { id }: RoleDto): Promise<RoleResponseDto> {
    return this.service.find(id);
  }

  @Roles('roles-update')
  @UseGuards(AuthorizeGuard)
  @Put('/:id')
  update(
    @Param() { id }: RoleDto,
    @Body() data: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.service.update(id, data);
  }

  @Roles('roles-delete')
  @UseGuards(AuthorizeGuard)
  @Delete('/:id')
  destroy(@Param() { id }: RoleDto): Promise<void> {
    return this.service.destroy(id);
  }

  @Roles('roles-permissions')
  @UseGuards(AuthorizeGuard)
  @Patch('/:id/permissions')
  updatePermissions(
    @Param() { id }: RoleDto,
    @Body() data: UpdateRolePermissionsDto,
  ): Promise<RoleResponseDto> {
    return this.service.updatePermissions(id, data);
  }
}
