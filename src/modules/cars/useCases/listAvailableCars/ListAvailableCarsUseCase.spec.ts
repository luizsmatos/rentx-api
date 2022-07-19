import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      category_id: 'category_id',
      daily_rate: 140.0,
      description: 'Description Car',
      fine_amount: 100,
      name: 'Audi A4',
      license_plate: 'DEF-1112',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars.length).toEqual(1);
    expect(cars[0]).toEqual(car);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      category_id: 'category_id',
      daily_rate: 140.0,
      description: 'Description Car',
      fine_amount: 100,
      name: 'Audi A4',
      license_plate: 'DEF-1112',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car_brand_test',
    });

    expect(cars.length).toEqual(1);
    expect(cars[0]).toEqual(car);
  });

  it('should be able to list all available cars by category id', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      category_id: 'category_id',
      daily_rate: 140.0,
      description: 'Description Car',
      fine_amount: 100,
      name: 'Audi A4',
      license_plate: 'DEF-1112',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars.length).toEqual(1);
    expect(cars[0]).toEqual(car);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Audi',
      category_id: 'category_id',
      daily_rate: 140.0,
      description: 'Description Car',
      fine_amount: 100,
      name: 'Audi A4',
      license_plate: 'DEF-1112',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Audi A4',
    });

    expect(cars.length).toEqual(1);
    expect(cars[0]).toEqual(car);
  });
});
