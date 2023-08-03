import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    type: String,
    example: generateUuid(),
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@domain.com',
  })
  email: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  isAdmin: boolean;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: [String],
    example: [],
  })
  roles: string[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.isAdmin = data.isAdmin;
    this.createdAt = data.createdAt;
    this.roles = data.roles.map((role) => role.id);
  }
}
