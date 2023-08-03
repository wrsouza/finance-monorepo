import { FindOptionsWhere, In, Not, Repository } from 'typeorm';

export abstract class BaseRepository<Entity> {
  readonly repository: Repository<Entity>;

  constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  list(where: FindOptionsWhere<Entity> = {}): Promise<Entity[]> {
    return this.repository.find(where);
  }

  save(record: Entity): Promise<Entity> {
    return this.repository.save(record);
  }

  validateExist(where: FindOptionsWhere<Entity>, id?: string): Promise<Entity> {
    if (id) {
      where['id'] = Not(id);
    }
    return this.repository.findOneBy(where);
  }

  findOne(where: FindOptionsWhere<Entity>): Promise<Entity> {
    return this.repository.findOneBy(where);
  }

  async destroy(where: FindOptionsWhere<Entity>): Promise<void> {
    await this.repository.delete(where);
  }

  findByIds(ids: string[]): Promise<Entity[]> {
    return this.repository.findBy({ id: In(ids) } as any);
  }
}
