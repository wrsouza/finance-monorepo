import { Column, Entity, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Identifiable } from './identifiable';

@Entity('permissions')
export class PermissionEntity extends Identifiable {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  roles?: RoleEntity[];
}
