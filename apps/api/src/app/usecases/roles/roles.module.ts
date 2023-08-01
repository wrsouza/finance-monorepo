import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, RoleEntity, PermissionEntity } from '@app/shared';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleRepository } from '../../repositories/role.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
    AuthModule,
  ],
  controllers: [RolesController],
  providers: [RoleRepository, RolesService],
})
export class RolesModule {}
