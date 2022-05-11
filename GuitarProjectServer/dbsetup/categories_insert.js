import categoryModel from '../models/category.model.js';

export const insert_categories_toDB = async () => {
  const electric_category = new categoryModel({
    name: 'Electric Guitars',
  });
  const acoustic_category = new categoryModel({
    name: 'Acoustic Guitars',
  });
  const classic_category = new categoryModel({
    name: 'Classic Guitars',
  });
  const bass_category = new categoryModel({
    name: 'Bass Guitars',
  });
  await electric_category.save();
  await acoustic_category.save();
  await classic_category.save();
  await bass_category.save();
};
