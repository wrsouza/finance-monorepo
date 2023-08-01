import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class LoginResponseDto {
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
    type: String,
    example: '',
  })
  @Expose()
  accessToken: string;

  constructor(data: any) {
    Object.assign(
      this,
      plainToInstance(LoginResponseDto, data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
