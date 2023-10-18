import axios from "axios";
import { BASE_URL } from "../url";
import { useDispatch } from "react-redux";
import { success } from "../slices/product-slice/ProductSlice";

export const fetchProducts = async () => {
  const dispatch = useDispatch();
  const res = await axios.get(BASE_URL);
  if (res.data) {
    dispatch(success(res.data));
  }
};
