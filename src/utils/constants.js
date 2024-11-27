export const REGEX = {
  EMAIL: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
  PHONE_NUMBER: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
};

export const SALT_BCRYPT_PASSWORD = 10;

export const ROLE = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  SELLER: 'seller',
  BUYER: 'buyer'
};

export const ACCOUNT_STATUS = {
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  BANNED: 'banned'
};

export const EXPIRATION_TIME = {
  OTP: 10 * 60 * 1000,
  RESET_PASSWORD_TOKEN: 10 * 60 * 1000,
  ACCESS_TOKEN: 10,
  REFRESH_TOKEN: 7 * 24 * 60 * 60
};
