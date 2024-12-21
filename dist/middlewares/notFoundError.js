"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_kit_1 = require("http-status-kit");
const notFound = (req, res, next) => {
    res.status(http_status_kit_1.statusCodes.NOT_FOUND).json({
        success: false,
        message: 'API Not Found!',
        statusCode: http_status_kit_1.statusCodes.NOT_FOUND,
        error: 'Not Found',
        stack: null
    });
};
exports.default = notFound;
