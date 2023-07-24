import { UserEntity } from '@app/shared/database/entities';
import { User } from './user.domain';
import { IMapper } from '@app/shared/domain';
import { Injectable } from '@nestjs/common';
import { Role } from './role.domain';
import { v4 as uuid } from 'uuid';
import { RoleMapper } from './role.mapper';

@Injectable()
export class UserMapper implements IMapper<User, UserEntity> {
  constructor(private readonly roleMapper: RoleMapper) {}

  toPersistence(domain: User): UserEntity {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      isAdmin: domain.isAdmin,
      roles: domain.roles.map((role: Role) =>
        this.roleMapper.toPersistence(role),
      ),
    };
  }

  toDomain(record: User): User {
    const id = uuid();
    return new User({
      id,
      name: record.name,
      email: record.email,
      password: record.password,
      isAdmin: record.isAdmin,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      roles: record.roles.map((role: Role) => this.roleMapper.toDomain(role)),
    });
  }
}
