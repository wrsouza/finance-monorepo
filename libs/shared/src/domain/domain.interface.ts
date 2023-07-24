import { IRepository } from '@app/shared/database/repositories/repository.interface';
import { IMapper } from '@app/shared/domain';

export interface IDomain<Entity> {
  save(
    repository: IRepository<Entity>,
    mapper: IMapper<this, Entity>,
  ): Promise<this>;
  response(mapper: IMapper<this, Entity>): this;
}
