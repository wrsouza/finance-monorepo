import { PermissionEntity } from '@app/shared/database/entities';
import { BaseRepository } from '@app/shared/database/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionMapper } from '../domain/permission.mapper';
import { Permission } from '../domain/permission.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRepository extends BaseRepository<
  PermissionEntity,
  Permission
> {
  constructor(
    @InjectRepository(PermissionEntity)
    repository: Repository<PermissionEntity>,
    mapper: PermissionMapper,
  ) {
    super(repository, mapper);
  }
}
