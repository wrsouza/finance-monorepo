import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { v4 as uuid } from 'uuid';
import { PermissionEntity, RoleEntity } from '../entities';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const permissionRepository = dataSource.getRepository(PermissionEntity);
    const permissions = await permissionRepository.find({});
    const repository = dataSource.getRepository(RoleEntity);
    await repository.save([
      {
        id: uuid(),
        name: 'supervisor',
        description: 'Supervisor Role',
        permissions,
      },
    ]);
  }
}
