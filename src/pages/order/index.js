import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import baseApiUrl from "../../constants/apiUrl";
import UserContext from "../../context/UserContext";
import ConfirmOrder from "../../components/order/ConfirmOrder";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";

const Order = ({ productId }) => {
  const user = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [done, setDone] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [mobile, setMobile] = useState("");
  const [room, setRoom] = useState("");
  const [ordering, setOrdering] = useState(true);
  const back = () => {
    setDone(false);
  };
  const handleSubmit = () => {
    setDone(true);
  };
  const fetchProduct = async () => {
    setLoading(true);
    await axios
      .get(`${baseApiUrl}/product/${productId}`)
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
  useEffect(() => {
    fetchProduct();
  }, []);

  const placeOrder = async () => {
    setOrdered(true);
    setOrdering(true);
    await axios
      .post(
        `${baseApiUrl}/product/${productId}/order`,
        {
          quantity,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setOrdered(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOrdering(false);
      });
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
            <div className="w-full flex md:flex-col md:w-1/3 lg:w-1/2 md:items-center md:mt-16">
              <div className="flex-none w-28">
                <img
                  className="w-full"
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="flex-grow pl-4 md:pl-0 md:mt-4 md:text-center">
                <span className="font-bold text-xl">{product.name}</span>
                <div class="w-36 flex justify-between items-center mt-4 md:justify-center md:w-full">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((prevValue) => prevValue - 1);
                      }
                    }}
                    className="text-green-500 md:mr-10 hover:text-green-400 duration-500"
                  >
                    <MinusCircleIcon className="w-12" />
                  </button>{" "}
                  <span class="font-bold text-xl">{quantity}</span>{" "}
                  <button
                    onClick={() => {
                      if (quantity < product.stock)
                        setQuantity((prevValue) => prevValue + 1);
                    }}
                    className="text-green-500 md:ml-10 hover:text-green-400 duration-500"
                  >
                    <PlusCircleIcon className="w-12" />
                  </button>
                </div>
                <div className="mt-4">
                  <span className="font-bold text-green-500 text-xl lg:text-2xl">
                    {"₹ " + (quantity * product.price).toFixed(2)}
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
                value={user.details.username}
                placeholder="Name"
                disabled
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
                value={user.details.email}
                placeholder="Email"
                disabled
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
                value={mobile}
                onChange={(ev) => {
                  setMobile(ev.target.value);
                }}
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
                value={room}
                onChange={(ev) => {
                  setRoom(ev.target.value);
                }}
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
        <ConfirmOrder
          product={{ ...product, quantity }}
          back={back}
          placeOrder={placeOrder}
          ordered={ordered}
          ordering={ordering}
          user={user}
          mobile={mobile}
          room={room}
        />
      )}
    </div>
  );
};

export default Order;
