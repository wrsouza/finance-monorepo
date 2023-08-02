import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { IUserEntity, UserEntity } from './user.entity';
import { IIdentifiable, Identifiable } from './identifiable';

export interface IRoleEntity extends IIdentifiable {
  name: string;
  description: string;
  permissions?: PermissionEntity[];
  users?: IUserEntity[];
}

@Entity('roles')
export class RoleEntity extends Identifiable implements IRoleEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions?: PermissionEntity[];

  @ManyToMany(() => UserEntity, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  users?: UserEntity[];
}
