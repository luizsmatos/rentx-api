import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      start_date: new Date(),
      expected_return_date,
      end_date,
      id,
      total,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.car_id === car_id);

    return rental;
  }

  async findRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.user_id === user_id);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }
}

export { RentalsRepositoryInMemory };
