import { StatusCodes } from 'http-status-codes';
import { nodeMailer } from '~/config/nodemailer';
import { User } from '~/models';
import { ApiError } from '~/utils/ApiError';
import { ACCOUNT_STATUS } from '~/utils/constants';
import { generateOTP, generateToken } from '~/utils/helpers';
import jwt from 'jsonwebtoken';
import { env } from '~/config/environment';
const register = async (userData) => {
  const { email, phoneNumber } = userData;
  const isEmailTaken = await User.isEmailTaken(email);
  if (isEmailTaken) throw new ApiError(StatusCodes.BAD_REQUEST, 'Email này đã được sử dụng');

  const isPhoneNumberTaken = await User.isPhoneNumberTaken(phoneNumber);
  if (isPhoneNumberTaken)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Số điện thoại này đã được sử dụng');

  return await User.create(userData);
};

const login = async (userData) => {
  const { emailOrPhoneNumber, password } = userData;

  const user = await User.findOne({
    $or: [{ email: emailOrPhoneNumber }, { phoneNumber: emailOrPhoneNumber }]
  });

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy tài khoản');

  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Mật khẩu không đúng');

  if (user.status === ACCOUNT_STATUS.UNVERIFIED)
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Tài khoản chưa được xác minh');
  else if (user.status === ACCOUNT_STATUS.BANNED)
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Tài khoản đã bị cấm');

  const accessToken = generateToken.accessToken({
    userData: {
      id: user._id,
      roles: user.roles
    }
  });
  const refreshToken = generateToken.refreshToken({
    userData: {
      id: user._id,
      roles: user.roles
    }
  });

  return { user, accessToken, refreshToken };
};

const logout = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy tài khoản');
  return user;
};

const sendOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy tài khoản');
  if (user.status === ACCOUNT_STATUS.VERIFIED)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Tài khoản đã được xác minh');

  const otp = generateOTP();
  user.otp.value = otp;
  await user.save();

  const verifyEmail = nodeMailer.options({ email, template: 'OTP', params: { otp } });
  await nodeMailer.transporter.sendMail(verifyEmail);

  return user;
};

const verifyOTP = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy tài khoản');
  if (user.status === ACCOUNT_STATUS.VERIFIED)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Tài khoản đã được xác minh');
  if (user.otp.value !== otp) throw new ApiError(StatusCodes.BAD_REQUEST, 'Mã OTP không đúng');

  if (user.otp.expiredAt < Date.now())
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Mã OTP đã hết hạn');
  user.otp = null;
  user.status = ACCOUNT_STATUS.VERIFIED;
  await user.save();
  return user;
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Không tìm thấy refresh token');
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET_KEY);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token đã hết hạn');
    }
    throw error;
  }

  const { id } = decoded;

  const user = await User.findById(id);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy tài khoản');

  return generateToken.accessToken({
    userData: {
      id: user._id,
      roles: user.roles
    }
  });
};

export const authService = {
  register,
  login,
  sendOTP,
  verifyOTP,
  logout,
  refreshToken
};
