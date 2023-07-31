import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class PermissionResponseDto {
  @ApiProperty({
    type: String,
    example: generateUuid(),
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'create-permission',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Create Permission',
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
      plainToInstance(PermissionResponseDto, data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
