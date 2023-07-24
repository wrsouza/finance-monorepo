import { IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID(4)
  readonly id: string;
}
