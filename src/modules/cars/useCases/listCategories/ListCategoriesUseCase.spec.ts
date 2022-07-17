import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

let listCategoriesUseCase: ListCategoriesUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('List Categories', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );

    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be possible to list the categories', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoriesCreated = await listCategoriesUseCase.execute();

    expect(categoriesCreated.length).toEqual(1);
    expect(categoriesCreated[0]).toHaveProperty('id');
    expect(categoriesCreated[0].name).toEqual(category.name);
    expect(categoriesCreated[0].description).toEqual(category.description);
  });
});
