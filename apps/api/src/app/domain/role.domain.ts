import { Entity } from '@app/shared/domain';
import { Permission } from './permission.domain';
import { IRepository, IRoleEntity } from '@app/shared';

export class Role extends Entity<IRoleEntity> {
  readonly name: string;
  readonly description: string;
  permissions: Permission[];

  async validateExist(repository: IRepository<IRoleEntity>): Promise<this> {
    return super.validateExist(repository, {
      name: this.name,
    });
  }

  async updatePermissions(permissions: Permission[]): Promise<this> {
    this.permissions = permissions;
    return this;
  }
}
