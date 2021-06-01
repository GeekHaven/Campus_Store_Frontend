import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ConfirmOrder({
  product,
  back,
  placeOrder,
  ordered,
  user,
  mobile,
  room,
  ordering,
}) {
  return (
    <div className="w-screen min-h-screen bg-white pt-20">
      <div>
        <img className="w-24 mx-auto" src={product.image} alt={product.name} />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-green-500 text-center my-2">
          Product details
        </h2>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Title:</div>
          <div className="w-2/3 lg:w-1/2">{product.name}</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Price:</div>
          <div className="w-2/3 lg:w-1/2">{"₹ " + product.price}</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">
            Quantity:
          </div>
          <div className="w-2/3 lg:w-1/2">{product.quantity}</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Total:</div>
          <div className="w-2/3 lg:w-1/2">
            {"₹ " + product.price * product.quantity}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-green-500 text-center my-2">
          Delivery details
        </h2>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Name:</div>
          <div className="w-2/3 lg:w-1/2">{user.username}</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Email:</div>
          <div className="w-2/3 lg:w-1/2">{user.email}</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">
            Mobile no:
          </div>
          <div className="w-2/3 lg:w-1/2">{mobile ? mobile : "NA"}</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">
            Room no:
          </div>
          <div className="w-2/3 lg:w-1/2">{room ? room : "NA"}</div>
        </div>
      </div>

      <div className="p-4 flex justify-between md:justify-center">
        <button
          onClick={back}
          class="bg-gray-500 flex-none hover:bg-gray-600 duration-500 text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Edit
        </button>
        <button
          onClick={placeOrder}
          class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded ml-4"
          type="button"
        >
          PLACE ORDER
        </button>
      </div>

      {ordered && (
        <div
          style={{ zIndex: 999 }}
          className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center animate__animated animate__fadeIn px-10"
        >
          <div className="p-10 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center">
            {ordering ? (
              <h3 className="text-bold text-center text-green-500 text-3xl mb-5">
                Placing your order...
              </h3>
            ) : (
              <>
                <h3 className="text-bold text-center text-green-500 text-3xl mb-5">
                  Order Placed!
                </h3>{" "}
                <Link to="/">
                  <span class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded">
                    Back to browsing
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
