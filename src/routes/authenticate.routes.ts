import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { Router } from 'express';

const authenticateRouters = Router();

const createUserController = new AuthenticateUserController();

authenticateRouters.post('/sessions', createUserController.handle);

export { authenticateRouters };
