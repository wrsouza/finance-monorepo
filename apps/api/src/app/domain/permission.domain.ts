import { Entity } from '@app/shared/domain';

export class Permission extends Entity {
  readonly name: string;
  readonly description: string;
}
