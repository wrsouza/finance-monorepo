import { generateUuid } from '@app/shared/utils/uuid-generate.util';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateResponseDto {
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
    type: Date,
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  isAdmin: boolean;

  @ApiProperty({
    type: [String],
    example: '[]',
  })
  roles: string[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.isAdmin = data.isAdmin;

    const roles = data.roles.reduce(
      (last, role) => [
        ...new Set([
          ...last,
          ...role?.permissions.map((permission) => permission.name),
        ]),
      ],
      [],
    );
    this.roles = roles;
  }
}
