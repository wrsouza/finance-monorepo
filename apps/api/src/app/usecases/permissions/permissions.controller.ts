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
import { PermissionsService } from './permissions.service';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { CreatePermissionDto, PermissionDto, UpdatePermissionDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard, JwtAuthGuard, Roles } from '@app/shared';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Roles('permissions-list')
  @UseGuards(AuthorizeGuard)
  @Get()
  list(): Promise<PermissionResponseDto[]> {
    return this.service.list();
  }

  @Roles('permissions-create')
  @UseGuards(AuthorizeGuard)
  @Post()
  create(@Body() data: CreatePermissionDto): Promise<PermissionResponseDto> {
    return this.service.create(data);
  }

  @Roles('permissions-details')
  @UseGuards(AuthorizeGuard)
  @Get('/:id')
  find(@Param() { id }: PermissionDto): Promise<PermissionResponseDto> {
    return this.service.find(id);
  }

  @Roles('permissions-update')
  @UseGuards(AuthorizeGuard)
  @Put('/:id')
  update(
    @Param() { id }: PermissionDto,
    @Body() data: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.service.update(id, data);
  }

  @Roles('permissions-delete')
  @UseGuards(AuthorizeGuard)
  @Delete('/:id')
  destroy(@Param() { id }: PermissionDto): Promise<void> {
    return this.service.destroy(id);
  }
}
