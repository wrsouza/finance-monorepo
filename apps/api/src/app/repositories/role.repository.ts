import { RoleEntity } from '@app/shared/database/entities';
import { BaseRepository } from '@app/shared/database/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    repository: Repository<RoleEntity>,
  ) {
    super(repository);
  }
}
