import { FindOptionsWhere } from 'typeorm';

export interface IRepository<Entity> {
  list(where: FindOptionsWhere<Entity>): Promise<Entity[]>;

  save(record: Entity): Promise<Entity>;

  findOne(where: FindOptionsWhere<Entity>): Promise<Entity>;
}
