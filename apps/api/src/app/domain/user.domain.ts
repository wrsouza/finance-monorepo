import { Entity } from '@app/shared/domain';
import { Role } from './role.domain';
import { UserRepository } from '../repositories/user.repository';
import { BadRequestException } from '@nestjs/common';

export class User extends Entity {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isAdmin: boolean;
  roles?: Role[] = [];

  async validateExist(repository: UserRepository): Promise<this> {
    const record = await repository.validateExist(
      {
        email: this.email,
      },
      this.id,
    );
    if (record) {
      throw new BadRequestException('email already exist');
    }
    return this;
  }

  async save(repository: UserRepository): Promise<this> {
    await repository.save(this);
    return this;
  }
}
