import { JwtModule, PermissionEntity, UserEntity } from '@app/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from '../../repositories/permission.repository';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PermissionEntity]),
    JwtModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionRepository, PermissionsService],
})
export class PermissionsModule {}
