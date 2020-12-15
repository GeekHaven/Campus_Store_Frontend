import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Product from "./Product";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        let fetchedProducts = res.data;
        setProducts(fetchedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="grid gap-10 grid-cols-4 mt-10">
      {products.map((p, i) => {
        return (
          <Link to="/">
            <Product key={i} data={p} />
          </Link>
        );
      })}
    </div>
  );
};

export default ProductContainer;
