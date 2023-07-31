import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class UserResponseDto {
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
    type: Boolean,
    example: false,
  })
  @Expose()
  isAdmin: boolean;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @Expose()
  createdAt: Date;

  constructor(data: any) {
    Object.assign(
      this,
      plainToInstance(UserResponseDto, data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
