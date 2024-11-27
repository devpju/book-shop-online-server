import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '~/utils/ApiError';
import { User } from '~/models';

const isAuthorized = (user, allowedRoles) => allowedRoles.some((role) => user.roles.includes(role));

const authMiddleware =
  (allowedRoles = []) =>
  async (req, res, next) => {
    if (allowedRoles.length === 0) {
      return next(new ApiError(StatusCodes.FORBIDDEN, 'Quyền truy cập không được chỉ định'));
    }

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token không được cung cấp'));
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || !isAuthorized(user, allowedRoles)) {
        return next(
          new ApiError(StatusCodes.FORBIDDEN, 'Bạn không có quyền truy cập tài nguyên này')
        );
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token đã hết hạn', 'TOKEN_EXPIRED'));
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token không hợp lệ'));
      }
      next(error);
    }
  };

export default authMiddleware;
