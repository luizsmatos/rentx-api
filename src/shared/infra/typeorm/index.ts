import 'reflect-metadata';
import 'dotenv/config';

import { Category } from '@modules/cars/entities/Category';
import { DataSource } from 'typeorm';

import { CreateCategories1657024580247 } from './migrations/1657024580247-CreateCategories';

const dataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  migrations: [CreateCategories1657024580247],
  entities: [Category],
  subscribers: [],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
