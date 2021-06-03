import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
import ReactLoading from "react-loading";
import baseApiUrl from "../../constants/apiUrl";
import { ReactComponent as EmptyImage } from "../../images/empty.svg";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
    await axios
      .get(`${baseApiUrl}/product/`)
      .then((res) => {
        let fetchedProducts = res.data;
        setProducts(fetchedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
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
        The store is empty
      </h2>
    </div>
  );
};

export default ProductContainer;
