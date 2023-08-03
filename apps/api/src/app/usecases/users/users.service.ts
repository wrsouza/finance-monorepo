import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRolesDto,
  UserResponseDto,
} from './dto';
import { UserEntity, generateUuid, Encrypt } from '@app/shared';
import { UserRepository, RoleRepository } from '../../repositories';
import { User, Role } from '../../domain';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    @Inject(forwardRef(() => RoleRepository))
    private readonly roleRepository: RoleRepository,
  ) {}

  async list(): Promise<UserResponseDto[]> {
    const users = await this.repository.list({});
    return users.map((user) => new UserResponseDto(user));
  }

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    return new User({
      ...data,
      password: Encrypt.hash(data.password),
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
    const updatedData = { ...data };
    if (data.password) {
      updatedData.password = Encrypt.hash(data.password);
    }
    return this.getRecord(id)
      .then((record) => new User({ ...record, ...updatedData }))
      .then((user) => user.validateExist(this.repository))
      .then((user) => user.save(this.repository))
      .then((user) => new UserResponseDto(user));
  }

  async destroy(id: string): Promise<void> {
    await this.getRecord(id);
    await this.repository.destroy({ id });
  }

  async updateRoles(
    id: string,
    data: UpdateUserRolesDto,
  ): Promise<UserResponseDto> {
    return this.getRecord(id)
      .then((record) => new User(record))
      .then(async (user) => {
        const roles = await this.roleRepository.findByIds(data.roles);
        return user.updateRoles(roles.map((role) => new Role(role)));
      })
      .then((user) => user.save(this.repository))
      .then((user) => new UserResponseDto(user));
  }

  async getRecord(id: string): Promise<UserEntity> {
    const record = await this.repository.findOne({ id });
    if (!record) {
      throw new BadRequestException('user not found');
    }
    return record;
  }
}
