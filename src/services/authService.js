import { StatusCodes } from 'http-status-codes';
import { User } from '~/models';
import { ApiError } from '~/utils/ApiError';

const register = async (userData) => {
  const { email, phoneNumber } = userData;
  const isEmailTaken = await User.isEmailTaken(email);
  if (isEmailTaken) throw new ApiError(StatusCodes.BAD_REQUEST, 'Email này đã được sử dụng');

  const isPhoneNumberTaken = await User.isPhoneNumberTaken(phoneNumber);
  if (isPhoneNumberTaken)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Số điện thoại này đã được sử dụng');

  return await User.create(userData);
};

export const authService = {
  register
};
