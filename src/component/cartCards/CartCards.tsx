import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addToUserCart,
  removeFromUserCart,
} from "../../slices/account-slice/AccountSlice";
import OrderSummary from "../ordersummary/OrderSummary";
import { Link } from "react-router-dom";

const CartCards = () => {
  const [cartTotal, setCartTotal] = useState<number>(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.account.userCart);
  // useEffect(() => {
  //   if (localStorage.getItem("userCart")) {
  //     // console.log(JSON.parse(localStorage.getItem("userCart")));
  //     dispatch(getDataFromLocalStorage());
  //     // console.log(cart);
  //   }
  // }, []);

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
    <div
      className="one-card d-flex flex-column flex-md-row justify-content-between align-items-center my-2 p-4"
      key={index}
    >
      <div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <img className="cart-image" src={el.image} alt={el.title} />
            <div className="cart-product-link ps-4 d-flex flex-column ">
              <Link
                to={`/product/${el.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h5 className="link-to-hover text-left">
                  {el?.title?.substring(0, 50)}
                </h5>
              </Link>
              <div className="text-start text-black-50">
                {el?.category.toUpperCase()}
              </div>
            </div>
            <h6 className="m-4 cart-product-price">{`$ ${el.price}`}</h6>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
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
          <div className="q-num ">{el.quantity}</div>
        </div>
      </div>
      <div className="m-4">Total: $ {(el.price * el.quantity).toFixed(2)}</div>
    </div>
  ));

  return (
    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center align-items-md-start">
      <div className="card-card-container">
        {(cart || JSON.parse(localStorage.getItem("userCart")!)).length ===
        0 ? (
          <h1 className="p-4">"there are no items in the cart"</h1>
        ) : (
          mapCart
        )}
      </div>
      <OrderSummary cartTotal={cartTotal} />
    </div>
  );
};

export default CartCards;
