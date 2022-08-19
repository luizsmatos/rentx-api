import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHoursToRent = 24;

    const carRental = await this.rentalsRepository.findRentalByCar(car_id);

    if (carRental && !carRental.end_date) {
      throw new AppError('Car is unavailable');
    }

    const userRental = await this.rentalsRepository.findRentalByUser(user_id);

    if (userRental && !userRental.end_date) {
      throw new AppError("There's a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compareDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compareDate < minimumHoursToRent) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
