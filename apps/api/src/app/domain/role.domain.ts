import { Entity } from '@app/shared/domain';
import { Permission } from './permission.domain';

export class Role extends Entity {
  readonly name: string;
  readonly description: string;
  readonly permissions: Permission[];
}
