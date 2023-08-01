import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john.doe@domain.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    type: String,
  })
  @IsString()
  password: string;
}
