import { useAppDispatch, useAppSelector } from "../../hooks";
import { addToUserCart } from "../../slices/account-slice/AccountSlice";
import { Link } from "react-router-dom";

const Card = ({ product }: any) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.account);
  const addCartHandler = () => {
    dispatch(addToUserCart({ product: product, quantity: 1 }));
    console.log(cart.userCart);
  };

  return (
    <div className="relative">
      <button type="button" className="add-cart-btn" onClick={addCartHandler}>
        <i className="fa">&#xf067;</i>
      </button>
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div
          className="a-card d-flex flex-column justify-content-around"
          key={product.id}
        >
          <img
            className="products-img"
            src={product.image}
            alt={product.title}
          />
          <div className="mx-4">
            <h4 className="">{product.title.substring(0, 70)}</h4>
            <p className="">{product.description.substring(0, 100)}</p>
          </div>
          <div className="text-end pe-4 fs-5 fw-bold text-muted ">
            ${product.price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
