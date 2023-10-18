import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addToUserCart,
  getDataFromLocalStorage,
  removeFromUserCart,
} from "../../slices/account-slice/AccountSlice";
import OrderSummary from "../ordersummary/OrderSummary";

const CartCards = () => {
  const [cartTotal, setCartTotal] = useState<number>(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.account.userCart);
  useEffect(() => {
    if (localStorage.getItem("userCart")) {
      // console.log(JSON.parse(localStorage.getItem("userCart")));
      dispatch(getDataFromLocalStorage());
      // console.log(cart);
    }
  }, []);

  const sortedCart = [...cart].sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });
  useEffect(() => {
    const totalPrice = sortedCart.reduce((acc: number, cur: any) => {
      return acc + cur.price * cur.quantity;
    }, 0);
    setCartTotal(totalPrice);
  }, [cart]);
  // console.log(sortedCart);
  const mapCart = sortedCart.map((el: any, index: number) => (
    <tr className="one-card my-2" key={index}>
      <td>
        <div className="d-flex align-items-center">
          <img className="cart-image" src={el.image} alt={el.title} />
          <div className="ps-4 d-flex flex-column">
            <h5>{el?.title?.substring(0, 50)}</h5>
            <div className="text-start text-black-50">{el?.category}</div>
          </div>
        </div>
      </td>
      <td>$ {el.price}</td>
      <td>
        <div className="cart-quantity">
          <button
            className="q-btn1"
            onClick={() => {
              dispatch(addToUserCart({ product: el, quantity: 1 }));
            }}
          >
            +
          </button>
          <button
            className="q-btn2"
            onClick={() => {
              dispatch(removeFromUserCart(el));
            }}
          >
            -
          </button>
          <div className="q-num">{el.quantity}</div>
        </div>
      </td>
      <td>$ {(el.price * el.quantity).toFixed(2)}</td>
    </tr>
  ));

  return (
    <div className="d-flex justify-content-center">
      <table className="card-card-container">
        <tr>
          <th>Product Detail</th>
          <th>Price</th>
          <th className="">Quantity</th>
          <th>Total</th>
        </tr>
        {mapCart}
      </table>
      <OrderSummary cartTotal={cartTotal} />
    </div>
  );
};

export default CartCards;
// {cartContent.map((el: any) => el.title)}

/* OLD 
  // let counter = {};
  // cartContent.forEach((obj) => {
  //   let key = JSON.stringify(obj.title);
  //   counter[key] = (counter[key] || 0) + 1;
  // });
  // console.log(Object.entries(counter));
  // const map = Object.entries(counter).map((el) => el[0]);


 const cartData = useMemo(() => {
    const sumTotal = cartContent.reduce((acc: any, cur: any) => {
      console.log("x");
      return acc + cur.price;
    }, 0);
    const itemAmount = cartContent.reduce((acc: any, cur: any) => {
      console.log("y");
      const str = JSON.stringify(cur.title);
      acc[str] = acc[str] || 0;
      return acc;
    }, {});
    return { sumTotal, itemAmount };
  }, [cartContent]);



*/

// console.log(cartData.sumTotal);
// console.log(Object.keys(cartData.itemAmount).length);
// console.log(cartData.itemAmount);
