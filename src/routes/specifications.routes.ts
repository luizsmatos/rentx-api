import { Router } from 'express';

import { ensureAuthenticate } from '@middlewares/ensureAuthenticate';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRouters = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouters.use(ensureAuthenticate);
specificationsRouters.post('/', createSpecificationController.handle);

export { specificationsRouters };
