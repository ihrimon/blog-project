"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    // handle zod validation error
    if (error instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        res.status(statusCode).json({
            success: false,
            message,
            statusCode,
            error: error.issues,
            stack: config_1.default.NODE_ENV === 'development' ? error.stack : null,
        });
        return;
    }
    // handle mongoose validation error
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
    }
    // handle cast error
    if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        statusCode = 400;
        message = 'Invalid Input';
    }
    // handle duplicate error
    if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        const matchedValue = error.message.match(/"([^"]*)"/);
        const extractedMessage = matchedValue && matchedValue[1];
        statusCode = 409;
        message = `${extractedMessage} is already exists`;
    }
    // handle AppError
    if (error instanceof CustomError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
    }
    // handle global error
    if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
    }
    // send error response and status
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error,
        stack: config_1.default.NODE_ENV === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.default = globalErrorHandler;
