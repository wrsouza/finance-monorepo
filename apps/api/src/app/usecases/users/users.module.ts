import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserRepository } from '../../repositories/user.repository';
import { UsersService } from './users.service';
import {
  UserEntity,
  RoleEntity,
  PermissionEntity,
  JwtModule,
} from '@app/shared';
import { RoleRepository } from '../../repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UserRepository, RoleRepository, UsersService],
})
export class UsersModule {}
