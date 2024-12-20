import { env } from '~/config/environment';

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

    const { user, accessToken, refreshToken } = await authService.login(userData);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    sendResponse({
      res,
      code: StatusCodes.OK,
      message: 'Đăng nhập tài khoản thành công',
      data: {
        ...user.toJSON(),
        accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userData = req.user;
    console.log(req.user);
    const user = await authService.logout(userData.id);
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
      secure: env.NODE_ENV === 'production'
    });
    sendResponse({
      res,
      code: StatusCodes.OK,
      message: 'Đăng xuất thành công',
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

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const accessToken = await authService.refreshToken(refreshToken);
    sendResponse({
      res,
      code: StatusCodes.OK,
      message: 'Làm mới token thành công',
      data: { accessToken }
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
  sendOTP,
  verifyOTP,
  logout,
  refreshToken
};
