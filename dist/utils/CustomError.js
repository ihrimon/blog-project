"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// custom error class
class CustomError extends Error {
    constructor(errorMessage, statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = CustomError;
