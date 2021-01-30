import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Product from "./Product";
import ReactLoading from "react-loading";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    setLoading(true);
    await axios
      .get("https://fakestoreapi.com/products")
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
  ) : (
    <div className="w-full grid gap-2 md:gap-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
      {products.map((p, i) => {
        return (
          <Link to={`/products/${p.id}`}>
            <Product key={p.id} data={p} />
          </Link>
        );
      })}
    </div>
  );
};

export default ProductContainer;
