import slugtify from 'slugtify';

export const generateSlug = async ({ Model, value, id }) => {
  let slug = slugtify(value, {
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
