import { Entity } from '@app/shared/domain';
import { BadRequestException } from '@nestjs/common';
import { Not } from 'typeorm';
import { PermissionRepository } from '../repositories/permission.repository';
import { PermissionMapper } from './permission.mapper';

export class Permission extends Entity {
  readonly name: string;
  readonly description: string;

  async validateExist(repository: PermissionRepository): Promise<this> {
    const record = await repository.findOne({
      name: this.name,
      id: Not(this.id),
    });
    if (record) {
      throw new BadRequestException('name already exist');
    }
    return this;
  }

  async save(
    repository: PermissionRepository,
    mapper: PermissionMapper,
  ): Promise<this> {
    const record = mapper.toPersistence(this);
    await repository.save(record);
    return this;
  }
}
