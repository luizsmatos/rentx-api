import 'reflect-metadata';
import 'dotenv/config';

import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/entities/User';
import { Category } from '@modules/cars/entities/Category';
import { Specification } from '@modules/cars/entities/Specification';

import { CreateCategories1657024580247 } from './migrations/1657024580247-CreateCategories';
import { CreateSpecifications1657309295662 } from './migrations/1657309295662-CreateSpecifications';
import { CreateUsers1657540235733 } from './migrations/1657540235733-CreateUsers';
import { AlterUserDeleteUsername1657590170490 } from './migrations/1657590170490-AlterUserDeleteUsername';

const dataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  migrations: [
    CreateCategories1657024580247,
    CreateSpecifications1657309295662,
    CreateUsers1657540235733,
    AlterUserDeleteUsername1657590170490,
  ],
  entities: [Category, Specification, User],
  subscribers: [],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
