import { Todo } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { IUser } from '../middleware/auth';
import {
  deleteTodoSchemaType,
  updateTodoSchemaType,
} from '../zod_schema/todo.schema';

export const getAllTodoHandler = async (req: Request, res: Response) => {
  const user = res.locals.user as IUser;

  const todoList = await prisma.todo.findMany({
    where: { user_id: user.id },
  });

  return res.status(200).json(todoList);
};

export const addTodoHandler = async (req: Request, res: Response) => {
  const { title } = req.body as Todo;
  const user = res.locals.user as IUser;

  await prisma.todo.create({
    data: {
      title,
      user_id: user.id,
    },
  });

  return res.status(201).json({
    message: 'New todo created for user : ' + user.id,
  });
};

export const updateTodoHandler = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as IUser;
    const updatedTodo = req.body as Todo;
    const { todoid } = req.params as updateTodoSchemaType;

    const isUpdated = await prisma.todo.updateMany({
      where: {
        id: todoid,
        user_id: user.id,
      },
      data: updatedTodo,
    });

    if (isUpdated.count == 0) {
      return res.status(400).json({
        message: 'Invalid todo id',
      });
    }

    return res.status(200).json({
      message: 'Todo updated !',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error !',
    });
  }
};

export const deleteTodoHandler = async (req: Request, res: Response) => {
  const user = res.locals.user as IUser;
  const { todoid } = req.params as deleteTodoSchemaType;

  const deleteCount = await prisma.todo.deleteMany({
    where: {
      id: todoid,
      user_id: user.id,
    },
  });

  if (deleteCount.count == 0) {
    return res.status(400).json({
      message: 'Invalid todo id',
    });
  }

  return res.status(200).json({
    message: 'Todo deleted !',
  });
};
