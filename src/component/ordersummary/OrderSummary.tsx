import { useDispatch } from "react-redux";
import { shippingFee } from "../../base";
import { checkoutOG } from "../../slices/account-slice/AccountSlice";
// import { getItem } from "localforage";
type OrderSummaryProps = {
  cartTotal: number;
};
// const OrderSummary = ({ cartTotal, b }: OrderSummaryProps): JSX.Element => {
const OrderSummary = ({ cartTotal }: OrderSummaryProps): JSX.Element => {
  const dispatch = useDispatch();
  const checkOutHandler = () => {
    if (localStorage.getItem("userCart")) {
      const newOrder = JSON.parse(localStorage.getItem("userCart")!);
      dispatch(checkoutOG(newOrder));
    }
  };

  return (
    <div className="order-summary d-flex flex-column justify-content-start">
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
        <button className="btn btn-dark">Apple Pay</button>
        <button className="btn btn-dark">Credit Card</button>
      </div>
    </div>
  );
};

export default OrderSummary;
