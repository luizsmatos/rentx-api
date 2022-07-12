import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is required');
  }

  const [, token] = authHeader.split(' ');
  const SECRET_KEY = process.env.JWT_SECRET_USER;

  try {
    const { sub: userId } = verify(token, SECRET_KEY) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new Error('User does not exists!');
    }

    next();
  } catch (err) {
    throw new Error('Invalid token!');
  }
}
