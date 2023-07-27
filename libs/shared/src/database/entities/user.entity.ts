import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Identifiable } from './identifiable';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends Identifiable {
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
