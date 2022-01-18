import { response, Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRouters = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouters.post('/', (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return response.status(400).json({ message: 'Category already exists' });
  }

  categoriesRepository.create({ name, description });
  return res.status(201).send();
});

categoriesRouters.get('/', (req, res) => {
  const categories = categoriesRepository.list();
  return res.json(categories);
});

export { categoriesRouters };
