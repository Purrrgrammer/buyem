import { useDispatch } from "react-redux";
import { shippingFee } from "../../base";
import { checkoutOG } from "../../slices/account-slice/AccountSlice";
import { Audio } from "react-loader-spinner";

// import { getItem } from "localforage";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
type OrderSummaryProps = {
  cartTotal: number;
};
// const OrderSummary = ({ cartTotal, b }: OrderSummaryProps): JSX.Element => {
const OrderSummary = ({ cartTotal }: OrderSummaryProps): JSX.Element => {
  const [cartStage, setCartStage] = useState("");
  const dispatch = useDispatch();

  const checkOutHandler = () => {
    if (JSON.parse(localStorage.getItem("userCart")!).length !== 0) {
      setCartStage("pending");
      setTimeout(() => {
        setCartStage("");
      }, 7000);
    }
    const newOrder = JSON.parse(localStorage.getItem("userCart")!);
    dispatch(checkoutOG(newOrder));
  };

  return (
    <div className="order-summary d-flex flex-column justify-content-start">
      {cartStage === "pending" ? (
        <div className="popup">
          payment pending
          <Audio height="200" width="200" color="white" ariaLabel="loading" />
        </div>
      ) : undefined}
      <h2>Order Summary</h2>
      <div className="d-flex justify-content-between px-4">
        <div>Cart Total</div>
        <div>$ {cartTotal.toFixed(2)}</div>
      </div>
      <div className="d-flex justify-content-between px-4">
        <div>Shipping Fee</div>
        <div>$ {shippingFee.Thailand}</div>
      </div>
      <div className="d-flex justify-content-between px-4">
        <div>Sum total</div>
        <div>$ {(cartTotal + shippingFee.Thailand).toFixed(2)}</div>
      </div>
      <div className="d-flex justify-content-around">
        <button onClick={checkOutHandler} className="btn btn-dark">
          Paypal
        </button>
        <button onClick={checkOutHandler} className="btn btn-dark">
          Apple Pay
        </button>
        <button onClick={checkOutHandler} className="btn btn-dark">
          Credit Card
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderSummary;
