import { Entity } from '@app/shared/domain/entity';
import { Role } from './role.domain';

export class User extends Entity {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isAdmin: boolean;
  readonly roles: Role[];
}
