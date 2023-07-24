import { PermissionEntity } from '@app/shared/database/entities';
import { BaseRepository } from '@app/shared/database/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    repository: Repository<PermissionEntity>,
  ) {
    super(repository);
  }
}
