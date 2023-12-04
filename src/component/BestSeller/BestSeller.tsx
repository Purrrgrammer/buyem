import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllMock, setMock } from "../../slices/mock-slice/MockSlice";
import {
  fetchProducts,
  getProductsError,
  getProductsStatus,
} from "../../slices/product-slice/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Card } from "..";
import { Product } from "../../model";

const BestSeller = () => {
  const dispatch = useAppDispatch();
  const productsStatus = useSelector(getProductsStatus);
  const productsError = useSelector(getProductsError);
  const products = useAppSelector((state) => state.products.products);
  const globalMockData = useSelector(selectAllMock);
  useEffect(() => {
    const getData = () => {
      if (productsStatus === "idle") {
        dispatch(fetchProducts());
      }
      if (productsStatus === "failed") {
        console.log(productsError);
      }
    };
    getData();
  }, [productsStatus, dispatch]);

  useEffect(() => {
    dispatch(setMock(products));
  }, [products]);

  const averageSales =
    globalMockData.reduce(
      (pre: number, cur: Product) => pre + cur.rating.count,
      0
    ) / products.length || 0;
  // console.log(averageSales);
  const bestSeller = globalMockData
    .filter((el: Product) => el.rating!.count > averageSales)
    .map((products: Product, index: number) => (
      <div
        className="d-flex justify-content-center text-center center-block col-xl-3 col-lg-4 col-md-6 mt-2"
        key={index}
      >
        <Card key={products.id} product={products} />
      </div>
    ))
    .slice(0, 8);

  return (
    <div>
      <h1 className="m-4">Our Picks</h1>
      <div className="container">
        <div className="row mx-2">{bestSeller}</div>
      </div>
    </div>
  );
};

export default BestSeller;
