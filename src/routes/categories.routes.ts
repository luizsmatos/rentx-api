import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });
  return res.status(201).send();
});

categoriesRouters.get('/', (_req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});

export { categoriesRouters };
