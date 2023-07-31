import { Entity } from '@app/shared/domain';
import { Permission } from './permission.domain';
import { BadRequestException } from '@nestjs/common';
import { Not } from 'typeorm';
import { RoleMapper } from './role.mapper';
import { RoleRepository } from '../repositories/role.repository';

export class Role extends Entity {
  readonly name: string;
  readonly description: string;
  readonly permissions: Permission[];

  async validateExist(repository: RoleRepository): Promise<this> {
    const record = await repository.findOne({
      name: this.name,
      id: Not(this.id),
    });
    if (record) {
      throw new BadRequestException('name already exist');
    }
    return this;
  }

  async save(repository: RoleRepository, mapper: RoleMapper): Promise<this> {
    const record = mapper.toPersistence(this);
    await repository.save(record);
    return this;
  }
}
