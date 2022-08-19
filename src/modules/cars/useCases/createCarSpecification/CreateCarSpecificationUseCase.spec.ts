import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should not be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['5423'];

      await createCarSpecificationUseCase.execute({
        specifications_id,
        car_id,
      });
    }).rejects.toEqual(new AppError('Car does not exists'));
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      description: 'Description Car',
      fine_amount: 60,
      name: 'Name Car 1',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'Description Car',
      name: 'Description name',
    });

    const specifications_id = [specification.id];

    const specificationCar = await createCarSpecificationUseCase.execute({
      specifications_id,
      car_id: car.id,
    });

    expect(specificationCar).toHaveProperty('specifications');
    expect(specificationCar.specifications.length).toEqual(1);
  });
});
