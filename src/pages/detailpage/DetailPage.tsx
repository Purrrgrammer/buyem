import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../model";
import axios from "axios";
import { BASE_URL } from "../../url";
import ProductDetail from "../../component/productDetail/ProductDetail";

const DetailPage = () => {
  const { productId } = useParams();
  const [displayDetail, setDisplayDetail] = useState<Product | null>(null);

  const callDataById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${productId}`);
      if (response) {
        setDisplayDetail(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callDataById();
  }, []);

  return (
    <div className="page ">
      <ProductDetail displayDetail={displayDetail} />
    </div>
  );
};

export default DetailPage;
