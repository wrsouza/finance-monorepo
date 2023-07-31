import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { CreatePermissionDto, PermissionDto, UpdatePermissionDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}

  @Get()
  list(): Promise<PermissionResponseDto[]> {
    return this.service.list();
  }

  @Post()
  create(@Body() data: CreatePermissionDto): Promise<PermissionResponseDto> {
    return this.service.create(data);
  }

  @Get('/:id')
  find(@Param() { id }: PermissionDto): Promise<PermissionResponseDto> {
    return this.service.find(id);
  }

  @Put('/:id')
  update(
    @Param() { id }: PermissionDto,
    @Body() data: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.service.update(id, data);
  }

  @Delete('/:id')
  destroy(@Param() { id }: PermissionDto): Promise<void> {
    return this.service.destroy(id);
  }
}
