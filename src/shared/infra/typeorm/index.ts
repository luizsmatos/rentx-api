import 'reflect-metadata';
import 'dotenv/config';

import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { CreateCategories1657024580247 } from './migrations/1657024580247-CreateCategories';
import { CreateSpecifications1657309295662 } from './migrations/1657309295662-CreateSpecifications';
import { CreateUsers1657540235733 } from './migrations/1657540235733-CreateUsers';
import { AlterUserDeleteUsername1657590170490 } from './migrations/1657590170490-AlterUserDeleteUsername';
import { CreateCars1658087024104 } from './migrations/1658087024104-CreateCars';
import { CreateSpecificationsCars1659101345586 } from './migrations/1659101345586-CreateSpecificationsCars';
import { CreateCarImages1660653155823 } from './migrations/1660653155823-CreateCarImages';

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
    CreateCars1658087024104,
    CreateSpecificationsCars1659101345586,
    CreateCarImages1660653155823,
  ],
  entities: [Category, Specification, User, Car],
  subscribers: [],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
