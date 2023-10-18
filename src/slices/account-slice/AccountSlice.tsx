import { createSlice } from "@reduxjs/toolkit";
import { Product, User } from "../../model";
import { UsersList } from "../../users_list";
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
    },
    setAccount: (state) => {
      const result = JSON.parse(localStorage.getItem("currentUser")!);
      return result;
    },
    login: (state, action) => {
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
        return result;
      } else {
        alert(`Please Login Again`);
      }
    },
    setLogout: (state) => {
      localStorage.removeItem("currentUser");
      state = defaultState;
      alert("you are logged out");
      window.location.reload();
    },
  },
});

export const selectAccount = (state: any) => state.account;
export default accountSlice.reducer;
export const {
  addToUserCart,
  removeFromUserCart,
  getDataFromLocalStorage,
  setAccount,
  setLogout,
  login,
} = accountSlice.actions;

/*cart index
      const itemsIndex= state.userCart.findIndex(item=>item.id ===action.payload.id)
      if(itemIndex >=0){
        state.userCart[itemIndex].cartQuantity +=1
      }else{const tempProduct ={action.payload,cartQuantity:1}
    state.userCart.push(tempProduct)
    }



    // problem
    addToCartByAmount: (state, action) => {
      // const extractItem = JSON.parse(localStorage.getItem("userCart")).find(
      //   (el) => el.id === action.payload.product.id
      // );
      // console.log(extractItem.quantity + parseInt(action.payload.quantity));
      // extractItem.quantity + parseInt(action.payload.quantity);
      // const newData = JSON.parse(localStorage.getItem("userCart")).filter(
      //   (el) => el.id !== action.payload.product.id
      // );
      // console.log(extractItem);
      // const result = [...newData, extractItem];
      // console.log(result);
      // localStorage.setItem("userCart", JSON.stringify(result));
    },
      */
