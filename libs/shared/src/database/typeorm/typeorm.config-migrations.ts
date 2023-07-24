import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const typeOrmConfig = new DataSource({
  type: process.env.CONNECTION_TYPE,
  url: process.env.CONNECTION_URL,
  entities: [`${__dirname}/../entities/*.entity{.js,.ts}`],
  seeds: [`${__dirname}/../seeds/*.seeder{.js,.ts}`],
  synchronize: false,
  logging: true,
  migrations: [`${__dirname}/../migrations/**/*{.js,.ts}`],
} as DataSourceOptions);

export default typeOrmConfig;
