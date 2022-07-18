import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import dataSource, { createConnection } from '@shared/infra/typeorm';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidv4();
  const password = await hash('admin', 10);

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        id,
        name: 'admin',
        email: 'admin@rentx.com.br',
        password,
        isAdmin: true,
        created_at: new Date(),
        driver_license: 'DEF-1234',
      },
    ])
    .execute();

  await connection.destroy();
}

create().then(() => console.log('User admin created!'));
