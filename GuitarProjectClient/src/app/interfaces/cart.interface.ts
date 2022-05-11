export default interface CartInterface {
  _id: string;
  guitar: {
    _id: string;
    name: string;
    picture: string;
  };
  amount: string;
  price: string;
}
