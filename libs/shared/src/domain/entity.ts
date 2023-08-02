import { BadRequestException } from '@nestjs/common';
import { IRepository } from '../database';

export abstract class Entity<T> {
  readonly id: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(values: any) {
    Object.assign(this, values);
  }

  async validateExist(repository: IRepository<T>, filter = {}): Promise<this> {
    const record = await repository.validateExist(filter, this.id);
    if (record) {
      throw new BadRequestException('email already exist');
    }
    return this;
  }

  async save(repository: IRepository<T>): Promise<this> {
    await repository.save(this);
    return this;
  }
}
