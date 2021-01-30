import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/product/Product";
import ReactLoading from "react-loading";

export default function ProductPage({ match }) {
  const productId = match.params.id;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    setLoading(true);
    await axios
      .get("https://fakestoreapi.com/products/" + productId)
      .then((res) => {
        let fetchedProduct = res.data;
        setProduct(fetchedProduct);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  return loading ? (
    <div className="px-5 md:px-12 lg:px-24 pt-10 md:pt-16 lg:pt-24">
      <div className="flex h-96 justify-center items-center w-full ">
        <ReactLoading type="spin" color="#10b981" />
      </div>
    </div>
  ) : (
    <div className="px-5 md:px-12 lg:px-24 pt-24 md:pt-0">
      <div className="flex flex-col md:flex-row">
        <div className="flex justify-center items-center md:w-1/2 md:min-h-screen">
          <img
            className="h-60 md:h-auto md:w-1/2"
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="py-5 md:w-1/2 md:min-h-screen flex flex-col justify-center">
          <h2 className="text-2xl lg:text-4xl text-center md:text-left text-green-500 font-bold">
            {product.title}
          </h2>
          <p className="pt-5">{product.description}</p>
          <div className="pt-5 flex justify-between lg:flex-col lg:justify-start">
            <span className="text-3xl lg:text-4xl font-bold text-green-500">
              {"$ " + product.price}
            </span>
            <button class="bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded lg:mt-4 lg:w-36 lg:text-3xl">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
