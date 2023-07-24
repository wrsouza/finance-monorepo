import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { v4 as uuid } from 'uuid';
import { PermissionEntity } from '../entities';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(PermissionEntity);
    const permissions = [
      {
        id: uuid(),
        name: 'create-permission',
        description: 'Create Permission',
      },
      {
        id: uuid(),
        name: 'permission-details',
        description: 'Show Permission Details',
      },
      {
        id: uuid(),
        name: 'create-role',
        description: 'Create Role',
      },
      {
        id: uuid(),
        name: 'role-details',
        description: 'Show Role Details',
      },
      {
        id: uuid(),
        name: 'create-user',
        description: 'Create User',
      },
      {
        id: uuid(),
        name: 'user-details',
        description: 'Show User Details',
      },
    ];
    await repository.insert(permissions);
  }
}
