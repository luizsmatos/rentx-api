import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRouters = Router();

const createUserController = new AuthenticateUserController();

authenticateRouters.post('/sessions', createUserController.handle);

export { authenticateRouters };
