import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Product from "../product/Product";
import ReactLoading from "react-loading";
import { ReactComponent as EmptyImage } from "../../images/empty.svg";
import { fetchProducts } from "../../api/products";
import UserContext from "../../context/UserContext";
import axios from "axios";
import baseApiUrl from "../../constants/apiUrl";

const ProductContainer = ({ forSeller }) => {
  const user = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchSellerProducts = () => {
    setLoading(true);
    axios
      .get(`${baseApiUrl}/seller/products`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
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
  useEffect(() => {
    if (forSeller) fetchSellerProducts();
    else fetchProducts(setLoading, setProducts);
  }, []);

  return loading ? (
    <div className="flex h-96 justify-center items-center w-full ">
      <ReactLoading type="spin" color="#10b981" />
    </div>
  ) : products.length ? (
    <div className="w-full grid gap-x-2 gap-y-8 md:gap-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10">
      {products.map((p) => {
        return (
          <Link key={p._id} to={`/products/${p._id}`}>
            <Product data={p} />
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="flex flex-col items-center pt-36 md:pt-20">
      <EmptyImage className="w-72 md:w-96 h-auto text-green-500" />
      <h2 className="text-gray-500 md:text-2xl text-xl mt-5">
        {forSeller
          ? "You have not created any products yet."
          : "The store is empty"}
      </h2>
      {forSeller && (
        <Link
          to="/product/add"
          class="bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
        >
          Add product
        </Link>
      )}
    </div>
  );
};

export default ProductContainer;
