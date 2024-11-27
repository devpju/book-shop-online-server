import { StatusCodes } from 'http-status-codes';
import { nodeMailer } from '~/config/nodemailer';
import { User } from '~/models';
import { ApiError } from '~/utils/ApiError';
import { ACCOUNT_STATUS } from '~/utils/constants';
import { generateOTP } from '~/utils/helpers';

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

  return user;
};

const sendOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy tài khoản');
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

  if (user.otp.value !== otp) throw new ApiError(StatusCodes.BAD_REQUEST, 'Mã OTP không đúng');

  if (user.otp.expiredAt < Date.now())
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Mã OTP đã hết hạn');
  user.otp = null;
  await user.save();
  return user;
};

export const authService = {
  register,
  login,
  sendOTP,
  verifyOTP
};
