import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { Router } from 'express';

const usersRouters = Router();

const createUserController = new CreateUserController();

usersRouters.post('/', createUserController.handle);

export { usersRouters };
