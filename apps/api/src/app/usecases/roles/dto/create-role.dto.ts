import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    example: 'supervisor',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Supervisor',
  })
  @IsString()
  description: string;
}
