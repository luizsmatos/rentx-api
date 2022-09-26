import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { sub: user_id, email } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    const {
      expires_in_refresh_token,
      expires_refresh_token_days,
      secret_refresh_token,
      secret_token,
      expires_in_token,
    } = auth;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id,
      expires_date: refreshTokenExpiresDate,
      refresh_token: refreshToken,
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      token: newToken,
      refresh_token: refreshToken,
    };
  }
}

export { RefreshTokenUseCase };
