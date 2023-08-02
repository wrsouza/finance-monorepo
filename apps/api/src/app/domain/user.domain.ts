import { Entity } from '@app/shared/domain';
import { Role } from './role.domain';
import { IRepository, IUserEntity } from '@app/shared';

export class User extends Entity<IUserEntity> {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isAdmin: boolean;
  roles?: Role[] = [];

  async validateExist(repository: IRepository<IUserEntity>): Promise<this> {
    return super.validateExist(repository, {
      email: this.email,
    });
  }
}
