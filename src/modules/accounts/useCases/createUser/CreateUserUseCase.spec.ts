import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@example.com',
      password: '123456',
      name: 'User test',
    };

    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create an existing user', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000123',
        email: 'userError@example.com',
        password: '123456',
        name: 'User test Error',
      };

      await createUserUseCase.execute(user);

      await createUserUseCase.execute(user);
    }).rejects.toEqual(new AppError('User already exists'));
  });
});
