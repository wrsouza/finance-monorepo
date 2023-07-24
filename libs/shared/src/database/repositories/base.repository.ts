import { FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseRepository<Entity> {
  private readonly repository: Repository<Entity>;

  constructor(repository: Repository<Entity>) {
    this.repository = repository;
  }

  list(where: FindOptionsWhere<Entity> = {}): Promise<Entity[]> {
    return this.repository.find(where);
  }

  save(record: Entity): Promise<Entity> {
    return this.repository.save(record);
  }

  findOne(where: FindOptionsWhere<Entity>): Promise<Entity> {
    return this.repository.findOneBy(where);
  }
}
