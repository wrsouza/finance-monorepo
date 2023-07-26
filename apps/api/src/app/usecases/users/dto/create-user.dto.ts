import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@domain.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  isAdmin: boolean;
}
