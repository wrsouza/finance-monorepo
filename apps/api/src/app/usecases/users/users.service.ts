import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../domain/user.domain';
import { UserEntity } from '@app/shared/database/entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async list(): Promise<UserResponseDto[]> {
    const users = await this.repository.list({});
    return users.map((user) => new UserResponseDto(user));
  }

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    return new User({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: generateUuid(),
    })
      .validateExist(this.repository)
      .then((user) => user.save(this.repository))
      .then((user) => new UserResponseDto(user));
  }

  async find(id: string): Promise<UserResponseDto> {
    return this.getRecord(id).then((record) => new UserResponseDto(record));
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto> {
    return this.getRecord(id)
      .then((record) => new User({ ...record, ...data }))
      .then((user) => user.validateExist(this.repository))
      .then((user) => user.save(this.repository))
      .then((user) => new UserResponseDto(user));
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
