import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IIdentifiable, Identifiable } from './identifiable';
import { IRoleEntity, RoleEntity } from './role.entity';

export interface IUserEntity extends IIdentifiable {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  roles?: IRoleEntity[];
}

@Entity('users')
export class UserEntity extends Identifiable implements IUserEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'is_admin', type: 'bool' })
  isAdmin: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: RoleEntity[];
}
