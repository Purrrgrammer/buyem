import { User } from "../model";
// from user API
export const UsersList: User[] = [
  {
    userId: 0,
    fullname: "bubble gummy bear",
    userName: "bubblegummy",
    userPassword: "bubblegummy",
    userEmail: "bubblegummy@gmail.com",
    userCart: [],
    loginState: true,
    image: "https://i.ytimg.com/vi/yJFP6yqq1XI/mqdefault.jpg",
    address: {
      billingAddress: "Saimai Roag",
      shippingAddress: "Donmuang Road",
    },
    orders: [],
    birthDate: "12/12/2012",
    country: "USA",
  },
  {
    userId: 1,
    fullname: "Heaven Breitenberg",
    userName: "HeavenBreitenberg",
    userPassword: "HeavenBreitenberg",
    userEmail: "HeavenBreitenberg@gmail.com",
    userCart: [],
    loginState: true,
    image:
      "https://pbs.twimg.com/profile_images/1659153833745063940/P-pSD1VF_400x400.jpg",
    address: {
      billingAddress: "Saimai Roag",
      shippingAddress: "Donmuang Road",
    },
    orders: [
      {
        orderNumber: 1,
        orderId: "xxxxxxxxxx",
        orderDate: "12/14/2023",
        orderInfo: [],
      },
      {
        orderNumber: 2,
        orderId: "yyyyyyyyy",
        orderDate: "12/14/2023",
        orderInfo: [],
      },
      {
        orderNumber: 3,
        orderId: "zzzzzzzzz",
        orderDate: "12/14/2023",
        orderInfo: [],
      },
    ],
    birthDate: "12/12/2012",
    country: "Thailand",
  },
];
