import 'reflect-metadata';
import 'dotenv/config';

import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { CreateCategories1657024580247 } from './migrations/1657024580247-CreateCategories';
import { CreateSpecifications1657309295662 } from './migrations/1657309295662-CreateSpecifications';
import { CreateUsers1657540235733 } from './migrations/1657540235733-CreateUsers';
import { AlterUserDeleteUsername1657590170490 } from './migrations/1657590170490-AlterUserDeleteUsername';
import { CreateCars1658087024104 } from './migrations/1658087024104-CreateCars';
import { CreateSpecificationsCars1659101345586 } from './migrations/1659101345586-CreateSpecificationsCars';
import { CreateCarImages1660653155823 } from './migrations/1660653155823-CreateCarImages';
import { CreateRentals1660914311971 } from './migrations/1660914311971-CreateRentals';
import { CreateUsersToken1663266280278 } from './migrations/1663266280278-CreateUsersToken';

const dataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
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
    CreateRentals1660914311971,
    CreateUsersToken1663266280278,
  ],
  entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
  subscribers: [],
});

export function createConnection(host = 'localhost'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
