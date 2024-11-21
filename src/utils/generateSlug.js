import slugify from 'slugify';

export const generateSlug = async ({ Model, value, id }) => {
  let slug = slugify(value, {
    replacement: '-',
    remove: undefined,
    lower: false,
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
