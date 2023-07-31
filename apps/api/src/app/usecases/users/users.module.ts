import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserRepository } from '../../repositories/user.repository';
import { UsersService } from './users.service';
import { UserEntity, RoleEntity, PermissionEntity } from '@app/shared';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, PermissionEntity]),
  ],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
})
export class UsersModule {}
