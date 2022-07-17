import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to create a new specification', async () => {
    const specification = {
      name: 'Specification Test',
      description: 'Specification Test Description',
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    const specificationCreated =
      await specificationsRepositoryInMemory.findByName(specification.name);

    expect(specificationCreated).toHaveProperty('id');
    expect(specificationCreated.name).toEqual(specification.name);
    expect(specification.description).toEqual(specification.description);
  });

  it('should be able to create a new specification with name exists', async () => {
    expect(async () => {
      const specification = {
        name: 'Specification Test ERROR',
        description: 'Specification Test Description ERROR',
      };

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      });

      await createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      });
    }).rejects.toEqual(new AppError('Specification already exists'));
  });
});
