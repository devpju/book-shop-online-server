import { StatusCodes } from 'http-status-codes';
import { env } from '~/config/environment';
import { sendResponse } from '~/utils/responseApi';
// eslint-disable-next-line no-unused-vars
export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], //
    stack: err.stack
  };
  if (env.NODE_ENV !== 'development') delete responseError.stack;
  console.error(responseError);
  sendResponse({ res, code: err.statusCode, message: err.message, data: { stack: err.stack } });
};
