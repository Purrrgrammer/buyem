import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import {
  clothingSize,
  jewerlySize,
  electronicsSize,
  productQuantity,
} from "../../base";
import { addToUserCart } from "../../slices/account-slice/AccountSlice";

const ProductDetail = ({ displayDetail }: any) => {
  const dispatch = useAppDispatch();
  const [quantitytoCart, setQuantitytoCart] = useState<number>(1);
  const [size, setSize] = useState("none");
  const anyHandler = (e: any) => {
    setSize(e.target.value);
  };

  const onChangeQuantitylHandler = (e: any) => {
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
        <div className="product-detail d-flex justify-content-center">
          <img src={displayDetail.image} alt={displayDetail.title} />
          <div className="product-detai-detail d-flex flex-column justify-content-between">
            <div>
              <h3 className="text-start font-weight-bold">
                {displayDetail.title}
              </h3>
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
            <div className="detali-btn d-flex justify-content-center">
              <div className="detail-option d-flex align-items-center p-3">
                <div>{"Size".toUpperCase()}</div>
                {sizeOption}
              </div>
              <div className="detail-option d-flex align-items-center p-3">
                <div>{"Quantity".toUpperCase()}</div>
                {quantityOption}
              </div>
              <button
                onClick={() => {
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
