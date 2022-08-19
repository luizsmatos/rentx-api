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

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  findRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.repository.findOneBy({
      car_id,
    });

    return rental;
  }

  findRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.repository.findOneBy({
      user_id,
    });

    return rental;
  }
}

export { RentalsRepository };
