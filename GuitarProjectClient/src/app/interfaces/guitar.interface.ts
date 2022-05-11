export default interface GuitarInterface {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  picture: string;
}
