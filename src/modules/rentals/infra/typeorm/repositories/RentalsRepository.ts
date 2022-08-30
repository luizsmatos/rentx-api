import { Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import dataSource from '@shared/infra/typeorm';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      end_date,
      id,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({
      car_id,
    });

    return rental;
  }

  async findRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({
      user_id,
    });

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({ id });

    return rental;
  }
}

export { RentalsRepository };
