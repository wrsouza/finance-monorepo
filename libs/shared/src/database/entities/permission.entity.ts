import { Column, Entity, ManyToMany } from 'typeorm';
import { IRoleEntity, RoleEntity } from './role.entity';
import { IIdentifiable, Identifiable } from './identifiable';

export interface IPermissionEntity extends IIdentifiable {
  name: string;
  description: string;
  roles?: IRoleEntity[];
}

@Entity('permissions')
export class PermissionEntity
  extends Identifiable
  implements IPermissionEntity
{
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  roles?: RoleEntity[];
}
