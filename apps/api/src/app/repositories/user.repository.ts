import { UserEntity } from '@app/shared/database/entities';
import { BaseRepository } from '@app/shared/database/repositories/base.repository';
import { User } from '../domain/user.domain';
import { UserMapper } from '../domain/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, User> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
    mapper: UserMapper,
  ) {
    super(repository, mapper);
  }
}
