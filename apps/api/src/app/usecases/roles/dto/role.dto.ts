import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RoleDto {
  @ApiProperty({
    type: String,
    example: '',
  })
  @IsUUID(4)
  readonly id: string;
}
