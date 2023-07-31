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
}
