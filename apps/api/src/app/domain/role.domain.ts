import { Domain } from '@app/shared/domain';
import { Permission } from './permission.domain';
import { RoleEntity } from '@app/shared/database/entities';

export class Role extends Domain<RoleEntity> {
  readonly name: string;
  readonly description: string;
  readonly permissions: Permission[];
}
