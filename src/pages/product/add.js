import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import baseApiUrl from "../../apiUrl";
import "animate.css";
import ReactLoading from "react-loading";

const AddProduct = ({ auth }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });
  const [savedProduct, setSavedProduct] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const handleChange = (event) => {
    let { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    axios
      .post(`${baseApiUrl}/product/create`, product, {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        let productData = res.data;
        setSavedProduct(productData);
        setDone(true);
      })
      .catch((err) =>
        setError(
          err?.response?.data?.error
            ? err.response.data.error
            : "Something went wrong. Please try again in a while"
        )
      )
      .finally(() => setLoading(false));
  };
  return (
    <div className="h-screen flex justify-center items-center px-3">
      <form
        onSubmit={handleSubmit}
        class="bg-white w-full md:w-1/2 lg:w-1/3 rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            Product name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="name"
            value={product.name}
            type="text"
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-4 flex">
          <div class="w-1/2 pr-2">
            <label class="block text-grey-darker text-sm font-bold mb-2">
              Price
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div class="w-1/2 pl-2">
            <label class="block text-grey-darker text-sm font-bold mb-2">
              Stock
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            Product image link
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="image"
            type="text"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            Product description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div class="flex items-center justify-end">
          <button
            class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {loading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
      {done && (
        <div
          style={{ zIndex: 9999 }}
          className="h-screen w-screen bg-gray-300 bg-opacity-50 fixed flex justify-center items-center animate__animated animate__fadeIn px-10"
        >
          <div className="p-10 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-bold text-center text-green-500 text-3xl mb-5">
              Your product was added!
            </h3>
            <Link to={`/products/${savedProduct?._id}`}>
              <span class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded">
                Go to product
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;