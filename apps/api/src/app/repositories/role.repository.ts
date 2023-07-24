import { RoleEntity } from '@app/shared/database/entities';
import { BaseRepository } from '@app/shared/database/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../domain/role.domain';
import { RoleMapper } from '../domain/role.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity, Role> {
  constructor(
    @InjectRepository(RoleEntity)
    repository: Repository<RoleEntity>,
    mapper: RoleMapper,
  ) {
    super(repository, mapper);
  }
}
