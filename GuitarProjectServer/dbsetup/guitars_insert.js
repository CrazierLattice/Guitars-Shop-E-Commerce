import guitarModel from '../models/guitar.model.js';
import categoryModel from '../models/category.model.js';

export const insert_guitars_toDB = async () => {
  //Get all the categories ids
  const electric_category = await categoryModel.findOne({
    name: 'Electric Guitars',
  });
  const acoustic_category = await categoryModel.findOne({
    name: 'Acoustic Guitars',
  });
  const classic_category = await categoryModel.findOne({
    name: 'Classic Guitars',
  });
  const bass_category = await categoryModel.findOne({ name: 'Bass Guitars' });
  //Insert guitars to electric_category

  //Electric Guitars
  const electric_one = new guitarModel({
    name: 'Fender JT-300MDB Jay Turser',
    category: electric_category._id,
    price: '700',
    picture: 'https://peimot.com/Cat_471170_4784.png',
  });
  const electric_two = new guitarModel({
    name: 'Ibanez RGIX7FDLB RG Iron Label Series - Northern Lights Burst',
    category: electric_category._id,
    price: '3200',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/RGIX7FDLB_NLB_1(1).png',
  });
  const electric_three = new guitarModel({
    name: 'Pro-Mod San Dimas Style 2 HH FR M Ash',
    category: electric_category._id,
    price: '4000',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/130799-Pro-Mod-San-Dimas-ash(1).jpg',
  });
  const electric_four = new guitarModel({
    name: 'Fender Player Jaguar Sonic Red',
    category: electric_category._id,
    price: '5321',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/0146303525_gtr_frt_001_rr(1).jpg',
  });
  //Acoustic Guitars

  const acoustic_one = new guitarModel({
    name: 'Fender FA-125',
    category: acoustic_category._id,
    price: '700',
    picture: 'https://www.kley-zemer.co.il/Media/Uploads/2414-36-92-0(1).png',
  });
  const acoustic_two = new guitarModel({
    name: 'Yamaha FG820',
    category: acoustic_category._id,
    price: '1600',
    picture: 'https://www.kley-zemer.co.il/Media/Uploads/FG820(1).jpg',
  });
  const acoustic_three = new guitarModel({
    name: 'Takamine GF15CE',
    category: acoustic_category._id,
    price: '1800',
    picture: 'https://www.kley-zemer.co.il/Media/Uploads/GF30CE-BSB(1).jpg',
  });
  const acoustic_four = new guitarModel({
    name: 'Fender Newporter Player Candy Apple Red',
    category: acoustic_category._id,
    price: '2000',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/0970743009_gtr_frt_001_rr(1).jpg',
  });

  //Classic Guitars
  const classic_one = new guitarModel({
    name: 'Kapok LC-14 Natural',
    category: classic_category._id,
    price: '350',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/20161012101844156(1).jpg',
  });
  const classic_two = new guitarModel({
    name: 'Alhambra - 3/4 Cadete 1 Open',
    category: classic_category._id,
    price: '2000',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/ALHAMBRA_4P_-CLASSICAL_GUITAR_CADET(1).jpg',
  });
  const classic_three = new guitarModel({
    name: 'Admira Malaga- EC',
    category: classic_category._id,
    price: '1700',
    picture: 'https://www.kley-zemer.co.il/Media/Uploads/MALAGA_EC(1).jpg',
  });
  const classic_four = new guitarModel({
    name: 'Alhambra MOD.1C',
    category: classic_category._id,
    price: '2400',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/ALHAMBRA_MOD.1C(1).jpg',
  });

  const bass_one = new guitarModel({
    name: 'Fender American Elite Jazz Bass Black',
    category: bass_category._id,
    price: '6900',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/0197002706_gtr_frt_001_rr(1).jpg',
  });
  const bass_two = new guitarModel({
    name: "Squier by Fender Classic Vibe '50s Precision Bass - 2 Color Sunburst",
    category: bass_category._id,
    price: '2200',
    picture: 'https://www.kley-zemer.co.il/Media/Uploads/2414-57-838_1.jpg',
  });
  const bass_three = new guitarModel({
    name: 'Fender Precision Bass American Performer',
    category: bass_category._id,
    price: '7100',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/2414-57-370_front(1).jpg',
  });
  const bass_four = new guitarModel({
    name: "Fender American Original '60s Jazz Bass",
    category: bass_category._id,
    price: '8200',
    picture:
      'https://www.kley-zemer.co.il/Media/Uploads/0190130809_gtr_frt_001_rr(1).jpg',
  });

  await electric_one.save();
  await electric_two.save();
  await electric_three.save();
  await electric_four.save();

  await acoustic_one.save();
  await acoustic_two.save();
  await acoustic_three.save();
  await acoustic_four.save();

  await classic_one.save();
  await classic_two.save();
  await classic_three.save();
  await classic_four.save();

  await bass_one.save();
  await bass_two.save();
  await bass_three.save();
  await bass_four.save();
};
