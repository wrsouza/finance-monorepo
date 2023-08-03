import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({
    type: String,
    example: generateUuid(),
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'supervisor',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Supervisor',
  })
  description: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: [String],
    example: [],
  })
  permissions: string[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.permissions = data.permissions.map((permission) => permission.id);
  }
}
