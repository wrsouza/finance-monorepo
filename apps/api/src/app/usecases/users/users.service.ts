import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { UserMapper } from '../../domain/user.mapper';
import { User } from '../../domain/user.domain';
import { UserEntity } from '@app/shared/database/entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly mapper: UserMapper,
  ) {}

  async list(): Promise<UserResponseDto[]> {
    const users = await this.repository.list({});
    return users.map((user: UserEntity) =>
      this.mapper.toResponse(this.mapper.toDomain(user)),
    );
  }

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    return new User({
      ...data,
      id: generateUuid(),
    })
      .validateEmailExist(this.repository)
      .then((user) => user.save(this.repository, this.mapper))
      .then((user) => this.mapper.toResponse(user));
  }

  async find(id: string): Promise<UserResponseDto> {
    return this.getRecord(id).then((record) => {
      const user = this.mapper.toDomain(record);
      return this.mapper.toResponse(user);
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    return this.getRecord(id)
      .then((record) => this.mapper.toDomain({ ...record, ...data }))
      .then((user) => user.validateEmailExist(this.repository))
      .then((user) => user.save(this.repository, this.mapper))
      .then((user) => this.mapper.toResponse(user));
  }

  async destroy(id: string): Promise<void> {
    await this.getRecord(id);
    await this.repository.destroy({ id });
  }

  async getRecord(id: string): Promise<UserEntity> {
    const record = await this.repository.findOne({ id });
    if (!record) {
      throw new BadRequestException('user not found');
    }
    return record;
  }
}
