import CartCards from "../../component/cartCards/CartCards";

const CartPage = () => {
  return (
    <div className="page px-4">
      <h1 className="my-4">My Cart</h1>
      <CartCards />
    </div>
  );
};

export default CartPage;

/*

JSON.parse(localStorage.getItem("userCart"))

*/
