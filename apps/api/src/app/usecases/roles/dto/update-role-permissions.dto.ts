import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateRolePermissionsDto {
  @ApiProperty({
    type: [String],
    example: [],
  })
  @IsArray()
  permissions: string[];
}
