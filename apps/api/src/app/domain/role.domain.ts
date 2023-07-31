import { Entity } from '@app/shared/domain';
import { Permission } from './permission.domain';
import { BadRequestException } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';

export class Role extends Entity {
  readonly name: string;
  readonly description: string;
  permissions: Permission[];

  async validateExist(repository: RoleRepository): Promise<this> {
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

  async save(repository: RoleRepository): Promise<this> {
    await repository.save(this);
    return this;
  }
}
