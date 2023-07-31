import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';
import { Role, RoleMapper } from '../../domain';
import { RoleResponseDto } from './dto/role-response.dto';
import { RoleEntity } from '@app/shared';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { generateUuid } from '@app/shared/utils/uuid-generate.util';

@Injectable()
export class RolesService {
  constructor(
    private readonly repository: RoleRepository,
    private readonly mapper: RoleMapper,
  ) {}

  async list(): Promise<RoleResponseDto[]> {
    const roles = await this.repository.list({});
    return roles.map((role: RoleEntity) =>
      this.mapper.toResponse(this.mapper.toDomain(role)),
    );
  }

  async create(data: CreateRoleDto): Promise<RoleResponseDto> {
    return new Role({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: generateUuid(),
    })
      .validateExist(this.repository)
      .then((role) => role.save(this.repository, this.mapper))
      .then((role) => this.mapper.toResponse(role));
  }

  async find(id: string): Promise<RoleResponseDto> {
    return this.getRecord(id).then((record) => {
      const user = this.mapper.toDomain(record);
      return this.mapper.toResponse(user);
    });
  }

  async update(id: string, data: UpdateRoleDto): Promise<RoleResponseDto> {
    return this.getRecord(id)
      .then((record) => this.mapper.toDomain({ ...record, ...data }))
      .then((role) => role.validateExist(this.repository))
      .then((role) => role.save(this.repository, this.mapper))
      .then((role) => this.mapper.toResponse(role));
  }

  async destroy(id: string): Promise<void> {
    await this.getRecord(id);
    await this.repository.destroy({ id });
  }

  async getRecord(id: string): Promise<RoleEntity> {
    const record = await this.repository.findOne({ id });
    if (!record) {
      throw new BadRequestException('Role not found');
    }
    return record;
  }
}
