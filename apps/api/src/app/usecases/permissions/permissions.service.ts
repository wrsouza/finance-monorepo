import { BadRequestException, Injectable } from '@nestjs/common';
import { PermissionRepository } from '../../repositories/permission.repository';
import { Permission, PermissionMapper } from '../../domain';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { PermissionEntity } from '@app/shared';
import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly repository: PermissionRepository,
    private readonly mapper: PermissionMapper,
  ) {}

  async list(): Promise<PermissionResponseDto[]> {
    const permissions = await this.repository.list({});
    return permissions.map((permission: PermissionEntity) =>
      this.mapper.toResponse(this.mapper.toDomain(permission)),
    );
  }

  async create(data: CreatePermissionDto): Promise<PermissionResponseDto> {
    return new Permission({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: generateUuid(),
    })
      .validateExist(this.repository)
      .then((permission) => permission.save(this.repository, this.mapper))
      .then((permission) => this.mapper.toResponse(permission));
  }

  async find(id: string): Promise<PermissionResponseDto> {
    return this.getRecord(id).then((record) => {
      const user = this.mapper.toDomain(record);
      return this.mapper.toResponse(user);
    });
  }

  async update(
    id: string,
    data: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.getRecord(id)
      .then((record) => this.mapper.toDomain({ ...record, ...data }))
      .then((permission) => permission.validateExist(this.repository))
      .then((permission) => permission.save(this.repository, this.mapper))
      .then((permission) => this.mapper.toResponse(permission));
  }

  async destroy(id: string): Promise<void> {
    await this.getRecord(id);
    await this.repository.destroy({ id });
  }

  async getRecord(id: string): Promise<PermissionEntity> {
    const record = await this.repository.findOne({ id });
    if (!record) {
      throw new BadRequestException('permission not found');
    }
    return record;
  }
}
