import { FindOptionsWhere, In } from 'typeorm';

export interface IRepository<Entity> {
  list(where: FindOptionsWhere<Entity>): Promise<Entity[]>;

  save(record: any): Promise<Entity>;

  validateExist(where: FindOptionsWhere<Entity>, id?: string): Promise<Entity>;

  findOne(where: FindOptionsWhere<Entity>): Promise<Entity>;

  destroy(where: FindOptionsWhere<Entity>): Promise<void>;

  findByIds(ids: string[]): Promise<Entity[]>;
}
