import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import {
  clothingSize,
  jewerlySize,
  electronicsSize,
  productQuantity,
} from "../../base";
import { addToUserCart } from "../../slices/account-slice/AccountSlice";
import { Product } from "../../RTK";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type propType = { displayDetail: Product | null };

const ProductDetail = ({ displayDetail }: propType) => {
  const notify = () => toast("Wow so easy!");

  const dispatch = useAppDispatch();
  const [quantitytoCart, setQuantitytoCart] = useState<number | string>(1);
  const [size, setSize] = useState("none");
  const anyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };
  useEffect(() => {
    console.log(quantitytoCart);
  }, [quantitytoCart]);
  const onChangeQuantitylHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuantitytoCart(e.target.value);
  };

  const quantityOption = (
    <select value={quantitytoCart} onChange={onChangeQuantitylHandler}>
      {productQuantity.map((el: number, index) => (
        <option key={index} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
  // size option
  let sizeOption;
  if (displayDetail?.category === "men's clothing" || "women's clothing") {
    sizeOption = (
      <select value={size} onChange={anyHandler}>
        {clothingSize.map((el, index) => (
          <option key={index} value={el}>
            {el}
          </option>
        ))}
      </select>
    );
    if (displayDetail?.category === "jewelery") {
      sizeOption = (
        <select value={size} onChange={anyHandler}>
          {jewerlySize.map((el, index) => (
            <option key={index} value={el}>
              {el}
            </option>
          ))}
        </select>
      );
    }
    if (displayDetail?.category === "electronics") {
      sizeOption = <div>{electronicsSize}</div>;
    }
  }

  return (
    <>
      {displayDetail && (
        <div className="product-detail d-flex justify-content-center align-items-center">
          <img src={displayDetail.image} alt={displayDetail.title} />
          <div className="product-detail-detail d-flex flex-column justify-content-between">
            <div>
              <h4 className="text-start font-weight-bold">
                {displayDetail.title}
              </h4>
              <div className="text-start text-secondary">
                {displayDetail.category.toUpperCase()}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {displayDetail.rating.rate} ({displayDetail.rating.count}{" "}
                reviews)
              </div>
              <h3>{displayDetail.price} $</h3>
            </div>
            <div className="text-start">{displayDetail.description}</div>
            <div className="detali-btn d-flex flex-column flex-md-row justify-content-between">
              <div className="detail-option d-flex align-items-center justify-content-between p-3 ">
                <div className="px-2">{"Size".toUpperCase()}</div>
                {sizeOption}
                <div className="px-2">{"Quantity".toUpperCase()}</div>
                {quantityOption}
              </div>
              {/* <div className="detail-option d-flex align-items-center p-3"></div> */}
              <button
                onClick={() => {
                  notify;
                  dispatch(
                    addToUserCart({
                      product: displayDetail,
                      quantity: quantitytoCart,
                    })
                  );
                }}
              >
                {"ADD TO CART".toUpperCase()}
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
