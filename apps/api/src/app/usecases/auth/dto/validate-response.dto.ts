import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class ValidateResponseDto {
  @ApiProperty({
    type: String,
    example: generateUuid(),
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@domain.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    type: [String],
    example: '[]',
  })
  @Expose()
  roles: string[];

  constructor(data: any) {
    Object.assign(
      this,
      plainToInstance(ValidateResponseDto, data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
