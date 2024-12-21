"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFoundError_1 = __importDefault(require("./middlewares/notFoundError"));
const auth_route_1 = require("./modules/user/auth.route");
const admin_route_1 = require("./modules/user/admin.route");
const blog_route_1 = require("./modules/blog/blog.route");
// create 'Blog' application
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// application route
app.use('/api/auth', auth_route_1.AuthRoutes);
app.use('/api/admin', admin_route_1.AdminRoutes);
app.use('/api/blogs', blog_route_1.BlogRoutes);
// all application error handling
app.use(globalErrorHandler_1.default);
// handle not found error
app.use(notFoundError_1.default);
exports.default = app;
