"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.createBlogValidation = void 0;
const zod_1 = require("zod");
// validation schema for creating a blog
exports.createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Blog title is required',
            invalid_type_error: 'Title must be string',
        }),
        content: zod_1.z.string({
            required_error: 'Blog content is required',
            invalid_type_error: 'Content must be string',
        }),
    }),
});
// validation schema for updating blog content
exports.updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Blog title is required',
            invalid_type_error: 'Title must be string',
        }).optional(),
        content: zod_1.z.string({
            required_error: 'Blog content is required',
            invalid_type_error: 'Content must be string',
        }).optional(),
    }),
});
