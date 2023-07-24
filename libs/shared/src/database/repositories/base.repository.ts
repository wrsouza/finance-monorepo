import { IMapper } from '@app/shared/domain';
import { FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseRepository<E, D> {
  private readonly repository: Repository<E>;
  private readonly mapper: IMapper<D, E>;

  constructor(repository: Repository<E>, mapper: IMapper<D, E>) {
    this.repository = repository;
    this.mapper = mapper;
  }

  async save(domain: D): Promise<void> {
    const record = this.mapper.toPersistence(domain);
    await this.repository.save(record);
  }

  async findOne(where: FindOptionsWhere<E>): Promise<D> {
    const record = await this.repository.findOneBy(where);
    if (!record) {
      return null;
    }
    return this.mapper.toDomain(record);
  }
}
