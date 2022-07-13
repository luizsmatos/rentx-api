import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/entities/User';
import { Repository } from 'typeorm';

import dataSource from '@shared/infra/typeorm';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  findById(id: string): Promise<User> {
    const user = this.repository.findOneBy({ id });

    return user;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.repository.findOneBy({ email });

    return user;
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
