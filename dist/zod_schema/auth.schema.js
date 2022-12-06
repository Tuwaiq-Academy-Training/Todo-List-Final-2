"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z
            .string({
            required_error: 'Username is required !',
            invalid_type_error: 'Username must be a string',
        })
            .min(6, 'Username must be more than 6 char')
            .max(15, 'Username must be less than 15 char'),
        password: zod_1.z
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
        email: zod_1.z
            .string({
            required_error: 'Email is required !',
            invalid_type_error: 'Email must be a string',
        })
            .email('Please enter a valid email'),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: 'Username is required !',
            invalid_type_error: 'Username must be a string',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required !',
            invalid_type_error: 'Password must be a string',
        }),
    }),
});
