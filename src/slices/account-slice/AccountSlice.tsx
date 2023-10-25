import { createSlice } from "@reduxjs/toolkit";
import { Product, User } from "../../model";
import { UsersList } from "../../users_list";
import moment from "moment";
const initialState: User = {
  loginState: false,
  userName: localStorage.getItem("userName") || "default",
  fullname: "",
  userId: undefined,
  userPassword: "",
  userEmail: "",
  userCart: [],
  localCart: localStorage.getItem("userCart") && [],
  image:
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  address: {
    billingAddress: "none",
    shippingAddress: "none",
  },
  birthDate: "none",
  orders: [],
  country: "none",
};
const defaultState: User = {
  loginState: false,
  userName: "default",
  fullname: "none none",
  userId: undefined,
  userPassword: "",
  userEmail: "",
  userCart: [],
  localCart: [],
  image:
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
  address: {
    billingAddress: "no billing address, please login",
    shippingAddress: "no shipping address, please login",
  },
  orders: [],
  birthDate: "none",
  country: "none",
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addToUserCart: (state, action) => {
      console.log("state", state);
      console.log("action", action.payload);
      const findItem = state.userCart.find(
        (item: Product) => item.id == action.payload.product.id
      );
      if (findItem) {
        const data: Product = {
          ...findItem,
          quantity: findItem.quantity
            ? findItem.quantity + parseInt(action.payload.quantity)
            : 1,
        };
        const removeCurrentProduct = state.userCart.filter(
          (item: Product) => item.id !== action.payload.product.id
        );
        removeCurrentProduct.push(data);
        state.userCart = removeCurrentProduct;
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
      } else {
        const data = { ...action.payload.product, quantity: 1 };
        state.userCart.push(data);
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
      }
      console.log(action.payload);
    },
    removeFromUserCart: (state, action) => {
      const findItem = state.userCart.find(
        (item: Product) => item.id == action.payload.id
      );
      if (findItem && findItem.quantity !== 0) {
        const data: Product = {
          ...findItem,
          quantity: findItem.quantity ? findItem.quantity - 1 : 0,
        };
        const removeCurrentProduct = state.userCart.filter(
          (item: Product) => item.id !== action.payload.id
        );
        removeCurrentProduct.push(data);
        state.userCart = removeCurrentProduct;
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
      }
      if (findItem?.quantity !== 0) {
        const removeEmpthyItem = state.userCart.filter(
          (item: Product) => item.quantity !== 0
        );
        console.log(removeEmpthyItem);
        state.userCart = removeEmpthyItem;
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
      }
      // console.log(action.payload);
    },
    getDataFromLocalStorage: (state) => {
      // setuserCart = localStorage every time
      if (localStorage.getItem("userCart")) {
        state.userCart = JSON.parse(localStorage.getItem("userCart")!);
      }
      if (localStorage.getItem("newOrders")) {
        state.orders = JSON.parse(localStorage.getItem("newOrders")!);
      }
    },
    setAccount: () => {
      const result = JSON.parse(localStorage.getItem("currentUser")!);
      return result;
    },
    login: (_, action) => {
      const authorized = UsersList.some(
        (el) =>
          el.userName === action.payload.userName &&
          el.userPassword === action.payload.password
      );
      if (authorized) {
        const changetoThisUser = UsersList.find(
          (el) => el.userName === action.payload.userName
        );
        localStorage.setItem("currentUser", JSON.stringify(changetoThisUser));
        const result = JSON.parse(localStorage.getItem("currentUser")!);
        // state = result;
        return result;
      } else {
        alert(`Please Login Again`);
      }
    },
    setLogout: (state) => {
      localStorage.removeItem("currentUser");
      state === defaultState;
      alert("you are logged out");
      window.location.reload();
    },
    checkout: (state, action) => {
      const randomId = (maxOrderIDlength: number = 10) => {
        return Math.random()
          .toString(36)
          .substring(2, maxOrderIDlength + 2);
      };
      const currentDate = moment().format("DD/MM/YYYY");
      // from above is OK
      const newCheckout = action.payload;
      const ordersFromLocal = localStorage.getItem("newOrders");
      if (!ordersFromLocal) {
        const firstOrder = {
          orderNumber: 1,
          orderId: randomId(), //always unique
          orderDate: currentDate,
          orderInfo: newCheckout,
        };
        state.orders = [firstOrder];
        localStorage.setItem("newOrders", JSON.stringify(state.orders));
      } else {
        const prevOrder = JSON.parse(localStorage.getItem("newOrders")!);
        const newOrderNumber = prevOrder[prevOrder.length - 1].orderNumber + 1;
        const findOrderIDofSelected = state.orders?.find(
          (el) => el.orderId === newCheckout.orderId
        );
        const newandOldOrders = {
          orderNumber: newOrderNumber,
          orderId: findOrderIDofSelected ? randomId() : randomId(),
          orderDate: currentDate,
          orderInfo: newCheckout,
        };
        const newerOrder = [...prevOrder, newandOldOrders];
        state.orders = newerOrder;
        localStorage.setItem("newOrders", JSON.stringify(state.orders));
      }
    },
    checkoutOG: (state, action) => {
      // items = local
      if (localStorage.getItem("newOrders")) {
        state.orders = JSON.parse(localStorage.getItem("newOrders")!);
      }
      const newCheckout = action.payload;
      const duplicateOrderID = state.orders?.find(
        (el) => el.orderId === newCheckout.orderId
      );
      const randomId = (maxOrderIDlength: number = 10) => {
        return Math.random()
          .toString(36)
          .substring(2, maxOrderIDlength + 2);
      };
      const currentDate = moment().format("DD/MM/YYYY");

      if (!localStorage.getItem("userCart")) {
        console.log("add items in local");
      }
      const newOrder = {
        orderNumber:
          state.orders?.length !== 0
            ? state.orders![state.orders!.length - 1].orderNumber + 1
            : 1,
        orderId: duplicateOrderID ? randomId() : randomId(),
        orderDate: currentDate,
        orderInfo: newCheckout,
      };
      const previousOrders = state.orders!;
      const updatedOrders = [...previousOrders, newOrder];
      state.orders = updatedOrders;
      localStorage.setItem("newOrders", JSON.stringify(state.orders));
      localStorage.removeItem("userCart");
      window.location.reload();
    },
  },
});

export const selectAccount = (state: { account: User }) => state.account;
export default accountSlice.reducer;
export const {
  addToUserCart,
  removeFromUserCart,
  getDataFromLocalStorage,
  setAccount,
  setLogout,
  login,
  checkout,
  checkoutOG,
} = accountSlice.actions;