import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { UserMapper } from '../../domain/user.mapper';
import { User } from '../../domain/user.domain';
import { UserEntity } from '@app/shared/database/entities';
import { UserDto } from './dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapper: UserMapper,
  ) {}

  async list(): Promise<User[]> {
    const users = await this.repository.list();
    return users.map((user: UserEntity) =>
      this.mapper.toDomain(user).response(this.mapper),
    );
  }

  async create(data: UserDto): Promise<User> {
    const user = new User({
      ...data,
      id: uuid(),
    });
    return user
      .save(this.repository, this.mapper)
      .then((user) => user.response(this.mapper));
  }
}
