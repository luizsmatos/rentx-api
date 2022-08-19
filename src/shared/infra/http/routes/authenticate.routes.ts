import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const createUserController = new AuthenticateUserController();

authenticateRoutes.post('/sessions', createUserController.handle);

export { authenticateRoutes };
