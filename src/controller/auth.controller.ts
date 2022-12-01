import { User } from '@prisma/client';
import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../config/db';

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body as User;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(400).json({
      message: 'Wrong username or password !',
    });
  }

  const isMatched = await argon2.verify(user.password, password);

  if (!isMatched) {
    return res.status(400).json({
      message: 'Wrong username or password !',
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '5 days',
    }
  );

  return res.status(200).json({
    message: 'Welcome back ' + user.username + ' !',
    token,
  });
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body as User;
    const hashedPassword = await argon2.hash(password);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    return res.status(201).json({
      message: 'New user added ! ',
    });
  } catch (error) {
    return res.status(400).json({ message: 'Issue with your input' });
  }
};
