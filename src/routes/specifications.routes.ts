import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRouters = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRouters.post('/', (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository,
  );

  createSpecificationService.execute({ name, description });
  return res.status(201).send();
});

export { specificationsRouters };
