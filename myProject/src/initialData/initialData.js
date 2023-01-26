import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { getItemFromLocalStorage, setItemInLocalStorage } from "../services/localStorageService.js";
const initialData = () => {
  const data = {
    products: [
      {
        url: "https://d3m9l0v76dty0.cloudfront.net/system/photos/10083399/large/70602526c5892d95d8e2700b5c24ae4c.png",
        alt: "iphone",
        credit: "Daniel Danilov",
        price: 1_000,
      },
      {
        url: "https://d3m9l0v76dty0.cloudfront.net/system/photos/10083399/large/70602526c5892d95d8e2700b5c24ae4c.png",
        alt: "iphone",
        credit: "Daniel Danilov",
        price: 1_000,
      },
      {
        url: "https://d3m9l0v76dty0.cloudfront.net/system/photos/10083399/large/70602526c5892d95d8e2700b5c24ae4c.png",
        alt: "iphone",
        credit: "Daniel Danilov",
        price: 1_000,
      },
    ],
    users: [
      {
        name: { first: "regular", last: "user" },
        address: {
          state: "USA",
          country: "big",
          city: "New York",
          street: "52",
          houseNumber: "109",
          zip: 562145,
        },
        phone: "050-0000000",
        email: "user@gmail.com",
        password: "Aa1234!",
        isBusiness: true,
        isAdmin: true,
      },
      {
        name: { first: "bUsiness", last: "user" },
        address: {
          state: "USA",
          country: "cal",
          city: "New Jersey",
          street: "bird",
          houseNumber: "54",
          zip: 123456,
        },
        phone: "050-0000000",
        email: "business@gmail.com",
        password: "Aa1234!",
        isBusiness: true,
        isAdmin: true,
      },
      {
        name: { first: "admin", last: "user" },
        address: {
          state: "Israel",
          country: "Israel",
          city: "Tel Aviv",
          street: "il",
          houseNumber: "24",
          zip: 4444556,
        },
        phone: "050-0000000",
        email: "admin@gmail.com",
        password: "Aa1234!",
        isBusiness: true,
        isAdmin: true,
      },
    ],
  };

  if (!getItemFromLocalStorage("products")) {
    setItemInLocalStorage("products", JSON.stringify(data.products));
  }
  const products = JSON.parse(getItemFromLocalStorage("products")).map((item) => new Product(item, data.products));
  const users = data.users.map((user) => new User(user));

  return { products, users };
};

export default initialData;
