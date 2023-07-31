import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    type: String,
    example: 'create-permission',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Create Permission',
  })
  @IsString()
  description: string;
}
