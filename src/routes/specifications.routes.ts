import { ensureAuthenticate } from '@middlewares/ensureAuthenticate';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { Router } from 'express';

const specificationsRouters = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouters.use(ensureAuthenticate);
specificationsRouters.post('/', createSpecificationController.handle);

export { specificationsRouters };
