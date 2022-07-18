import { Router } from 'express';

import { ensureAdmin } from '@middlewares/ensureAdmin';
import { ensureAuthenticate } from '@middlewares/ensureAuthenticate';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRouters = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouters.use(ensureAuthenticate);
specificationsRouters.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRouters };
