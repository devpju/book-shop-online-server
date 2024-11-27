import slugify from 'slugify';

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
    isExistingSlug = await this.constructor.findOne({ slug });
  }
  return slug;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
