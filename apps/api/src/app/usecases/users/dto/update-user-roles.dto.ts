import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateUserRolesDto {
  @ApiProperty({
    type: [String],
    example: [],
  })
  @IsArray()
  roles: string[];
}
