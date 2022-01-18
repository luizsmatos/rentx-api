import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRouters.get('/', (_req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});

export { categoriesRouters };
