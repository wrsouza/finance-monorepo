import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) =>
    ({
      type: configService.get<string>('CONNECTION_TYPE'),
      url: configService.get<string>('CONNECTION_URL'),
    } as TypeOrmModuleOptions),
  inject: [ConfigService],
};
