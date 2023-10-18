import { shippingFee } from "../../base";

const OrderSummary = ({ cartTotal }) => {
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
        <button className="btn btn-dark">Paypal</button>
        <button className="btn btn-dark">Apple Pay</button>
        <button className="btn btn-dark">Credit Card</button>
      </div>
    </div>
  );
};

export default OrderSummary;
