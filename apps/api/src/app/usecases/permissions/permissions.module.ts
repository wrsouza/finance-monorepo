import { PermissionEntity } from '@app/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from '../../repositories/permission.repository';
import { PermissionMapper } from '../../domain';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [PermissionsController],
  providers: [PermissionRepository, PermissionMapper, PermissionsService],
})
export class PermissionsModule {}
