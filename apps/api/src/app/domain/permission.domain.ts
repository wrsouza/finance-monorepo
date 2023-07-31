import { Entity } from '@app/shared/domain';
import { BadRequestException } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';

export class Permission extends Entity {
  readonly name: string;
  readonly description: string;

  async validateExist(repository: PermissionRepository): Promise<this> {
    const record = await repository.validateExist(
      {
        name: this.name,
      },
      this.id,
    );
    if (record) {
      throw new BadRequestException('name already exist');
    }
    return this;
  }

  async save(repository: PermissionRepository): Promise<this> {
    await repository.save(this);
    return this;
  }
}
