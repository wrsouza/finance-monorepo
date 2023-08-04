import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RoleEntity,
  PermissionEntity,
  JwtModule,
  UserEntity,
} from '@app/shared';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleRepository } from '../../repositories/role.repository';
import { PermissionRepository } from '../../repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
    JwtModule,
  ],
  controllers: [RolesController],
  providers: [RoleRepository, PermissionRepository, RolesService],
})
export class RolesModule {}
