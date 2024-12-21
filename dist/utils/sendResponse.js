"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// custom response sent to server
const sendResponse = (res, resData) => {
    res.status(resData === null || resData === void 0 ? void 0 : resData.statusCode).json({
        success: resData === null || resData === void 0 ? void 0 : resData.success,
        message: resData === null || resData === void 0 ? void 0 : resData.message,
        statusCode: resData === null || resData === void 0 ? void 0 : resData.statusCode,
        data: resData === null || resData === void 0 ? void 0 : resData.data,
    });
};
exports.default = sendResponse;
