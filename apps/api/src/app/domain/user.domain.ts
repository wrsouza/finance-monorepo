import { Domain } from '@app/shared/domain/domain';
import { Role } from './role.domain';
import { UserEntity } from '@app/shared/database/entities';

export class User extends Domain<UserEntity> {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isAdmin: boolean;
  readonly roles: Role[];
}
