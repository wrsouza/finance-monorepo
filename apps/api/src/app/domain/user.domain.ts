import { Entity } from '@app/shared/domain';
import { Role } from './role.domain';
import { UserRepository } from '../repositories/user.repository';
import { Not } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { UserMapper } from './user.mapper';

export class User extends Entity {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isAdmin: boolean;
  roles?: Role[] = [];

  async validateEmailExist(repository: UserRepository): Promise<this> {
    const record = await repository.findOne({
      email: this.email,
      id: Not(this.id),
    });
    if (record) {
      throw new BadRequestException('email already exist');
    }
    return this;
  }

  async save(repository: UserRepository, mapper: UserMapper): Promise<this> {
    const record = mapper.toPersistence(this);
    await repository.save(record);
    return this;
  }
}
