import { Injectable } from '@nestjs/common';
import { PermissionMapper } from './permission.mapper';
import { PermissionEntity, RoleEntity } from '@app/shared/database/entities';
import { IMapper } from '@app/shared/domain';
import { Role } from './role.domain';
import { Permission } from './permission.domain';

@Injectable()
export class RoleMapper implements IMapper<Role, RoleEntity> {
  constructor(private readonly permissionMapper: PermissionMapper) {}

  toPersistence(domain: Role): RoleEntity {
    let permissions = [];
    if (domain.permissions) {
      permissions = domain.permissions.map((permission: Permission) =>
        this.permissionMapper.toPersistence(permission),
      );
    }
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      permissions,
    };
  }

  toDomain(record: RoleEntity): Role {
    let permissions = [];
    if (record.permissions) {
      permissions = record.permissions.map((permission: PermissionEntity) =>
        this.permissionMapper.toDomain(permission),
      );
    }
    return new Role({
      id: record.id,
      name: record.name,
      description: record.description,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      permissions,
    });
  }

  toResponse(domain: Role) {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      createdAt: domain.createdAt,
      permissions: domain.permissions,
    };
  }
}
