import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { PermissionEntity, RoleEntity, UserEntity } from '../entities';

export default class ResetSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    await userRepository.remove(await userRepository.find({}));

    const roleRepository = dataSource.getRepository(RoleEntity);
    await roleRepository.remove(await roleRepository.find({}));

    const permissionRepository = dataSource.getRepository(PermissionEntity);
    await permissionRepository.remove(await permissionRepository.find({}));
  }
}
