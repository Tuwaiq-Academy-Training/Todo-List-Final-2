import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Username is required !',
        invalid_type_error: 'Username must be a string',
      })
      .min(6, 'Username must be more than 6 char')
      .max(15, 'Username must be less than 15 char'),
    password: z
      .string({
        required_error: 'Password is required !',
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be more than 6 char')
      .max(15, 'Password must be less than 15 char'),
    // .regex(
    //   new RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
    //   'You password not strong '
    // ),
    email: z
      .string({
        required_error: 'Email is required !',
        invalid_type_error: 'Email must be a string',
      })
      .email('Please enter a valid email'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required !',
      invalid_type_error: 'Username must be a string',
    }),
    password: z.string({
      required_error: 'Password is required !',
      invalid_type_error: 'Password must be a string',
    }),
  }),
});
