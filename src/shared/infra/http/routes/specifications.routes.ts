import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAuthenticate';

const specificationsRouters = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouters.use(ensureAuthenticate);
specificationsRouters.post('/', createSpecificationController.handle);

export { specificationsRouters };
