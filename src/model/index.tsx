export interface User {
  userId: number | undefined;
  userPassword: string;
  userCart: Product[];
  orders: Orders[];
  localCart?: any;
  loginState: boolean;
  userEmail: string;
  fullname: string;
  userName: string;
  image: string;
  address: Address;
  birthDate: string;
  country: string;
  personalInfo?: PersonalInfo;
}
export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: Rating;
  quantity: number;
}
export interface Rating {
  rate: number;
  count: number;
}
export interface Orders {
  orderNumber: number;
  orderId: string;
  orderDate: string;
}
// for extent
export interface PersonalInfo {
  userEmail: string;
  fullname: string;
  userName: string;
  image: string;
  address: string;
  phoneNumber: string;
  birthDate: string;
}
export interface Address {
  billingAddress: string;
  shippingAddress: string;
}
