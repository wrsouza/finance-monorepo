import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../repositories/role.repository';
import { Role } from '../../domain';
import { RoleResponseDto } from './dto/role-response.dto';
import { RoleEntity } from '@app/shared';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { generateUuid } from '@app/shared/utils/uuid-generate.util';

@Injectable()
export class RolesService {
  constructor(private readonly repository: RoleRepository) {}

  async list(): Promise<RoleResponseDto[]> {
    const roles = await this.repository.list({});
    return roles.map((role) => new RoleResponseDto(role));
  }

  async create(data: CreateRoleDto): Promise<RoleResponseDto> {
    return new Role({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: generateUuid(),
    })
      .validateExist(this.repository)
      .then((role) => role.save(this.repository))
      .then((role) => new RoleResponseDto(role));
  }

  async find(id: string): Promise<RoleResponseDto> {
    return this.getRecord(id).then((record) => new RoleResponseDto(record));
  }

  async update(id: string, data: UpdateRoleDto): Promise<RoleResponseDto> {
    return this.getRecord(id)
      .then((record) => new Role({ ...record, ...data }))
      .then((role) => role.validateExist(this.repository))
      .then((role) => role.save(this.repository))
      .then((role) => new RoleResponseDto(role));
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
