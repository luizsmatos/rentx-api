import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRouters = Router();

specificationsRouters.post('/', (req, res) => {
  return createSpecificationController.handle(req, res);
});

export { specificationsRouters };
