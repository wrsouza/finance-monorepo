import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionMapper, RoleMapper } from '../../domain';
import { UserEntity, RoleEntity, PermissionEntity } from '@app/shared';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleRepository } from '../../repositories/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
  ],
  controllers: [RolesController],
  providers: [RoleRepository, RoleMapper, PermissionMapper, RolesService],
})
export class RolesModule {}
