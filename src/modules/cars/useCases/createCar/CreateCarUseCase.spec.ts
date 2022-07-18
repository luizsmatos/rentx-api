import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description Car',
      fine_amount: 60,
      name: 'Name Car',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        description: 'Description Car',
        fine_amount: 60,
        name: 'Name Car 1',
      });

      await createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        description: 'Description Car',
        fine_amount: 60,
        name: 'Name Car 2',
      });
    }).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should not be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      description: 'Description Car',
      fine_amount: 60,
      name: 'Name Car 2',
    });

    expect(car.available).toBe(true);
  });
});
