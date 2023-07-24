import { PermissionEntity } from '@app/shared/database/entities';
import { Injectable } from '@nestjs/common';
import { Permission } from './permission.domain';
import { IMapper } from '@app/shared/domain';
import { RoleMapper } from './role.mapper';

@Injectable()
export class PermissionMapper implements IMapper<Permission, PermissionEntity> {
  constructor(private readonly roleMapper: RoleMapper) {}

  toPersistence(domain: Permission): PermissionEntity {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
    };
  }

  toDomain(record: PermissionEntity): Permission {
    return new Permission({
      id: record.id,
      name: record.name,
      description: record.description,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  toResponse(domain: Permission) {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      createdAt: domain.createdAt,
    };
  }
}
