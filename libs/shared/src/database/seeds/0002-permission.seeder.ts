import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { v4 as uuid } from 'uuid';
import { PermissionEntity } from '../entities';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(PermissionEntity);
    const users = [
      {
        id: uuid(),
        name: 'users-list',
        description: 'List Users',
      },
      {
        id: uuid(),
        name: 'users-create',
        description: 'Create User',
      },
      {
        id: uuid(),
        name: 'users-details',
        description: 'Show User Details',
      },
      {
        id: uuid(),
        name: 'users-update',
        description: 'Update User',
      },
      {
        id: uuid(),
        name: 'users-delete',
        description: 'Delete User',
      },
      {
        id: uuid(),
        name: 'users-roles',
        description: 'Update User Roles',
      },
    ];

    const roles = [
      {
        id: uuid(),
        name: 'roles-list',
        description: 'List Roles',
      },
      {
        id: uuid(),
        name: 'roles-create',
        description: 'Create Role',
      },
      {
        id: uuid(),
        name: 'roles-details',
        description: 'Show Role Details',
      },
      {
        id: uuid(),
        name: 'roles-update',
        description: 'Update Role',
      },
      {
        id: uuid(),
        name: 'roles-delete',
        description: 'Delete Role',
      },
      {
        id: uuid(),
        name: 'roles-permissions',
        description: 'Update Role Permissions',
      },
    ];

    const permissions = [
      {
        id: uuid(),
        name: 'permissions-list',
        description: 'List Permissions',
      },
      {
        id: uuid(),
        name: 'permissions-create',
        description: 'Create Permission',
      },
      {
        id: uuid(),
        name: 'permissions-details',
        description: 'Show Permission Details',
      },
      {
        id: uuid(),
        name: 'permissions-update',
        description: 'Update Permission',
      },
      {
        id: uuid(),
        name: 'permissions-delete',
        description: 'Delete Permission',
      },
    ];
    await repository.insert([...users, ...roles, ...permissions]);
  }
}
