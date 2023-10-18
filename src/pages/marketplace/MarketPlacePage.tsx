import { useEffect, useState } from "react";
import {
  fetchProducts,
  getProductsError,
  getProductsStatus,
  // selectAllProducts,
} from "../../slices/product-slice/ProductSlice";
import { setMock, selectAllMock } from "../../slices/mock-slice/MockSlice";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Card, Pagination, SearchBar } from "../../component";
// import ProductDetail from "../../component/productDetail/ProductDetail";
import { getDataFromLocalStorage } from "../../slices/account-slice/AccountSlice";

const MarketPlacePage = () => {
  const dispatch = useAppDispatch();
  // the same as =const products = useSelector(selectAllProducts);
  // const account = useAppSelector((state) => state.account);
  const products = useAppSelector((state) => state.products.products);
  const productsStatus = useSelector(getProductsStatus);
  const productsError = useSelector(getProductsError);
  const globalMockData = useSelector(selectAllMock);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(8);

  // 0-7 , 8-15
  const lastPostIndex = currentPage * postPerPage; //8
  const firstPostIndex = lastPostIndex - postPerPage;

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
    // console.log(`mockvalue from page = ${globalMockData}`);
  }, [products]);

  // console.log(productsStatus);
  // console.log("mockData", mockData);
  //data passing in form of data = [many{}]
  // console.log("mockData", globalMockData);
  let content;
  if (productsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (productsStatus === "succeeded") {
    content = globalMockData
      .map((products: any, index: number) => (
        <div
          className="d-flex justify-content-center text-center center-block col-xl-3 col-lg-4 col-md-4 mt-2"
          key={index}
        >
          <Card key={products.id} product={products} />
        </div>
      ))
      .slice(firstPostIndex, lastPostIndex);
  } else if (productsStatus === "failed") {
    content = <div className="loading-state">{productsError}</div>;
  }

  useEffect(() => {
    dispatch(getDataFromLocalStorage());
  }, []);

  return (
    <>
      <SearchBar />
      <div className="page container">
        <div className="row mx-4">{content}</div>
        <Pagination
          postPerPage={postPerPage}
          totalPosts={globalMockData.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default MarketPlacePage;

/*
we use mockdata before universalmock

// let content;
 if (productsStatus === "loading") {
      content = <p>"Loading..."</p>;
    } else if (productsStatus === "succeeded") {
      content = globalMockData.map((products: any, index: number) => (
        <div className="col" key={index}>
          <Card key={products.id} product={products} />
        </div>
      ));
    } else if (productsStatus === "failed") {
      content = <div className="loading-state">{productsError}</div>;
    }
  };

*/

/* new content
  const [content, setContent] = useState("");

useEffect(() => {
    const setContentt = () => {
      if (productsStatus === "loading") {
        setContent("Loading");
        console.log("loadinot");
      }
      if (productsStatus === "succeeded") {
        console.log("succeeded");
        const contentResult = globalMockData.map(
          (products: any, index: number) => (
            <div className="col" key={index}>
              <Card key={products.id} product={products} />
            </div>
          )
        );
        setContent(contentResult);
      }
    };
    setContentt();
  }, [productsStatus]);

*/
