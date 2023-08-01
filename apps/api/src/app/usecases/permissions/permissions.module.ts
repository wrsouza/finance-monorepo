import { PermissionEntity } from '@app/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from '../../repositories/permission.repository';
import { PermissionsService } from './permissions.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity]), AuthModule],
  controllers: [PermissionsController],
  providers: [PermissionRepository, PermissionsService],
})
export class PermissionsModule {}
