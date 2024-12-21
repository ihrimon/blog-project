"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidation = exports.createUserSchemaValidation = void 0;
const zod_1 = require("zod");
// validation schema for user creation
exports.createUserSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be string',
        }),
        email: zod_1.z.string().email('Invalid email address'),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(20, { message: 'Password must not exceed 20 characters' }),
    }),
});
// validationi schema for user login
exports.loginUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Password is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
