import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RoleDto {
  @ApiProperty({
    type: String,
    example: generateUuid(),
  })
  @IsUUID(4)
  readonly id: string;
}
