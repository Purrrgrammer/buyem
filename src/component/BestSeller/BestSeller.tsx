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
    globalMockData.reduce((pre, cur) => pre + cur.rating.count, 0) /
    products.length;
  console.log(averageSales);
  const bestSeller = globalMockData
    .filter((el: Product) => el.rating!.count > averageSales)
    .slice(0, 8);
  let ourPicks;
  ourPicks = bestSeller.map((products: Product, index: number) => (
    <div
      className="d-flex justify-content-center text-center center-block col-xl-3 col-lg-4 col-md-4 mt-2"
      key={index}
    >
      <Card key={products.id} product={products} />
    </div>
  ));
  return (
    <div>
      <h2 className="m-4">Our Picks</h2>
      <div className="row mx-4">{ourPicks}</div>
    </div>
  );
};

export default BestSeller;
