import baseApiUrl from "../constants/apiUrl";
import axios from "axios";

const fetchProducts = (setLoading, setProducts) => {
  setLoading(true);
  axios
    .get(`${baseApiUrl}/product/`)
    .then((res) => {
      let fetchedProducts = res.data;
      setProducts(fetchedProducts);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

export { fetchProducts };
