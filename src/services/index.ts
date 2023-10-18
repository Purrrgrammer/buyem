import axios from "axios";
import { BASE_URL } from "../url";

export const Service = () => {
  return {
    getProducts: async () => {
      try {
        const response = await axios.get(BASE_URL);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  };
};
