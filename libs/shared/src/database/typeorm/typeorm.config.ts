import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PermissionEntity, RoleEntity, UserEntity } from '../entities';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) =>
    ({
      type: configService.get<string>('CONNECTION_TYPE'),
      url: configService.get<string>('CONNECTION_URL'),
      entities: [UserEntity, RoleEntity, PermissionEntity],
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
    } as TypeOrmModuleOptions),
  inject: [ConfigService],
};
