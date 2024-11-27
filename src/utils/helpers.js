import slugify from 'slugify';
import jwt from 'jsonwebtoken';
import { env } from '~/config/environment';
import { EXPIRATION_TIME } from './constants';
export const generateSlug = async ({ Model, value, id }) => {
  let slug = slugify(value, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    locale: 'vi',
    trim: true
  });

  let isExistingSlug = await Model.findOne({ slug });
  while (isExistingSlug) {
    const idPart = id.slice(0, 5);
    slug = `${slug}-${idPart}`;
    isExistingSlug = await Model.findOne({ slug });
  }
  return slug;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateToken = {
  accessToken: ({ userData }) => {
    return jwt.sign(userData, env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: EXPIRATION_TIME.ACCESS_TOKEN
    });
  },
  refreshToken: ({ userData }) => {
    return jwt.sign(userData, env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: EXPIRATION_TIME.REFRESH_TOKEN
    });
  }
};
