const { StatusCodes } = require('http-status-codes');
const { authService } = require('~/services');
const { sendResponse } = require('~/utils/responseApi');

const register = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await authService.register(userData);

    sendResponse({
      res,
      code: StatusCodes.CREATED,
      message: 'Đăng ký tài khoản thành công',
      data: newUser.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userData = req.body;

    const user = await authService.login(userData);
    console.log(user);
    sendResponse({
      res,
      code: StatusCodes.OK,
      message: 'Đăng nhập tài khoản thành công',
      data: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login
};
