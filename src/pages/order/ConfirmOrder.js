import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ConfirmOrder({ product, back }) {
  const [ordered, setOrdered] = useState(false);
  return (
    <div className="w-screen min-h-screen bg-white pt-20">
      <div>
        <img className="w-24 mx-auto" src={product.image} alt={product.title} />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-green-500 text-center my-2">
          Product details
        </h2>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Title:</div>
          <div className="w-2/3 lg:w-1/2">{product.title}</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Price:</div>
          <div className="w-2/3 lg:w-1/2">{"$ " + product.price}</div>
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
            {"$ " + product.price * product.quantity}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-green-500 text-center my-2">
          Delivery details
        </h2>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Name:</div>
          <div className="w-2/3 lg:w-1/2">Jaidev Das</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">Email:</div>
          <div className="w-2/3 lg:w-1/2">iit2019197@iiita.ac.in</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">
            Mobile no:
          </div>
          <div className="w-2/3 lg:w-1/2">6299022644</div>
        </div>
        <div className="flex">
          <div className="w-1/3 lg:w-1/2 text-right font-bold pr-2">
            Room no:
          </div>
          <div className="w-2/3 lg:w-1/2">5241Q</div>
        </div>
      </div>
      {ordered ? (
        <div className="p-4 flex flex-col justify-center items-center">
          <h3 className="text-center font-bold text-green-500 text-xl mb-2">
            Order Placed!
          </h3>
          <Link
            to="/"
            class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
          >
            Back to browsing
          </Link>
        </div>
      ) : (
        <div className="p-4 flex justify-between md:justify-center">
          <button
            onClick={back}
            class="bg-gray-500 flex-none hover:bg-gray-600 duration-500 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOrdered(true);
            }}
            class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded ml-4"
            type="button"
          >
            CONFIRM ORDER
          </button>
        </div>
      )}
    </div>
  );
}
