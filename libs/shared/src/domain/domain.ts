import { IRepository } from '../database/repositories/repository.interface';
import { IDomain } from './domain.interface';
import { IMapper } from './mapper.interface';

export abstract class Domain<Entity> implements IDomain<Entity> {
  readonly id: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(values: any) {
    Object.assign(this, values);
  }

  async save(
    repository: IRepository<Entity>,
    mapper: IMapper<this, Entity>,
  ): Promise<this> {
    const record = mapper.toPersistence(this);
    await repository.save(record);
    return this;
  }

  response(mapper: IMapper<this, Entity>): this {
    return mapper.toResponse(this);
  }
}
