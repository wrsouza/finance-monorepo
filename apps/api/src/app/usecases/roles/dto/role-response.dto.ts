import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class RoleResponseDto {
  @ApiProperty({
    type: String,
    example: generateUuid(),
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'supervisor',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Supervisor',
  })
  @Expose()
  description: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @Expose()
  createdAt: Date;

  constructor(data: any) {
    Object.assign(
      this,
      plainToInstance(RoleResponseDto, data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
