"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoSchema = exports.updateTodoSchema = exports.addTodoSchema = void 0;
const zod_1 = require("zod");
exports.addTodoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required !',
            invalid_type_error: 'Title must be a string',
        })
            .min(2, 'Title must be more than 2 char'),
    }),
});
exports.updateTodoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required !',
            invalid_type_error: 'Title must be a string',
        })
            .min(2, 'Title must be more than 2 char')
            .max(15, 'Title must be less than 15 char'),
    }),
    params: zod_1.z.object({
        todoid: zod_1.z.string({
            required_error: 'id is required !',
            invalid_type_error: 'todo id must be a string',
        }),
    }),
});
exports.deleteTodoSchema = zod_1.z.object({
    params: zod_1.z.object({
        todoid: zod_1.z.string({
            required_error: 'id is required !',
            invalid_type_error: 'todo id must be a string',
        }),
    }),
});
