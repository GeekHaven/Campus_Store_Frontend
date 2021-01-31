import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmOrder from "./ConfirmOrder";
import ReactLoading from "react-loading";

const Order = ({ match }) => {
  const productId = match.params.id;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [done, setDone] = useState(false);
  const back = () => {
    setDone(false);
  };
  const handleSubmit = () => {
    setDone(true);
  };
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
    window.scrollTo(0, 0);
  };
  return (
    <div>
      {!done ? (
        <div className="min-h-screen flex flex-col md:flex-row-reverse  px-3 pt-20 lg:pt-28">
          {loading ? (
            <div className="w-full flex md:flex-col md:w-1/3 lg:w-1/2">
              <div className="flex h-96 justify-center items-center w-full ">
                <ReactLoading type="spin" color="#10b981" />
              </div>
            </div>
          ) : (
            <div className="w-full flex md:flex-col md:w-1/3 lg:w-1/2">
              <div className="flex-none w-28">
                <img
                  className="w-full"
                  src={product.image}
                  alt={product.title}
                />
              </div>

              <div className="flex-grow pl-4 md:pl-0 md:mt-4">
                <span className="font-bold text-xl">{product.title}</span>
                <div class="w-36 flex justify-between items-center mt-4">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((prevValue) => prevValue - 1);
                      }
                    }}
                    className="text-gray-400 font-bold text-3xl w-10 border flex justify-center items-center"
                  >
                    <span>-</span>
                  </button>{" "}
                  <span>{quantity}</span>{" "}
                  <button
                    onClick={() => {
                      setQuantity((prevValue) => prevValue + 1);
                    }}
                    className="text-gray-400 font-bold text-3xl w-10 border flex justify-center items-center"
                  >
                    <span>+</span>
                  </button>
                </div>
                <div className="mt-4">
                  <span className="font-bold text-green-500 text-xl lg:text-2xl">
                    {"$ " + quantity * product.price}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div class="bg-white w-full md:w-2/3 lg:w-1/3 rounded px-8 pt-6 pb-8 mb-4 flex flex-col ">
            <hr className="md:hidden" />
            <h1 className="font-bold text-xl text-green-500 my-4">
              Enter your details
            </h1>
            <div class="mb-4">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="Name"
              >
                Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="mobile"
              >
                Mobile no
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="mobile"
                type="text"
                placeholder="Mobile no"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-grey-darker text-sm font-bold mb-2"
                for="room"
              >
                Room No.
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                id="room"
                type="text"
                placeholder="Room no."
              />
            </div>
            <div class="flex justify-end">
              <button
                onClick={handleSubmit}
                class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ConfirmOrder product={{ ...product, quantity }} back={back} />
      )}
    </div>
  );
};

export default Order;
