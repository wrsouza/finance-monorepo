import { PermissionEntity } from '@app/shared/database/entities';
import { Domain } from '@app/shared/domain';

export class Permission extends Domain<PermissionEntity> {
  readonly name: string;
  readonly description: string;
}
