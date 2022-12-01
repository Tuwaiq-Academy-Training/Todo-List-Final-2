import { z } from 'zod';

export const addTodoSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required !',
        invalid_type_error: 'Title must be a string',
      })
      .min(2, 'Title must be more than 2 char')
      .max(15, 'Title must be less than 15 char'),
  }),
});

export const updateTodoSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required !',
        invalid_type_error: 'Title must be a string',
      })
      .min(2, 'Title must be more than 2 char')
      .max(15, 'Title must be less than 15 char'),
  }),
  params: z.object({
    todoid: z.string({
      required_error: 'id is required !',
      invalid_type_error: 'todo id must be a string',
    }),
  }),
});

export const deleteTodoSchema = z.object({
  params: z.object({
    todoid: z.string({
      required_error: 'id is required !',
      invalid_type_error: 'todo id must be a string',
    }),
  }),
});

export type deleteTodoSchemaType = z.infer<typeof deleteTodoSchema>['params'];

export type updateTodoSchemaType = z.infer<typeof updateTodoSchema>['params'];
