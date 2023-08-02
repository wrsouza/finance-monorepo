import { Entity } from '@app/shared/domain';
import { IPermissionEntity, IRepository } from '@app/shared';

export class Permission extends Entity<IPermissionEntity> {
  readonly name: string;
  readonly description: string;

  async validateExist(
    repository: IRepository<IPermissionEntity>,
  ): Promise<this> {
    return super.validateExist(repository, {
      name: this.name,
    });
  }
}
