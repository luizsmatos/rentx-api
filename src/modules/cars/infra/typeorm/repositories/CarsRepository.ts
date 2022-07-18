import { Repository } from 'typeorm';

import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import dataSource from '@shared/infra/typeorm';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOneBy({
      license_plate,
    });

    return car;
  }
}

export { CarsRepository };
