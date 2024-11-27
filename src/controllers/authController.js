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
const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authService.sendOTP(email);
    sendResponse({
      res,
      code: StatusCodes.OK,
      message: 'Gửi OTP thành công',
      data: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await authService.verifyOTP({ email, otp });
    sendResponse({
      res,
      code: StatusCodes.OK,
      message: 'Xác minh tài khoản thành công',
      data: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
  sendOTP,
  verifyOTP
};
