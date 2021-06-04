import React from "react";
import { Link } from "react-router-dom";

export default function OrderListComponent({ order }) {
  return (
    <Link
      to={`/orders/${order._id}`}
      className="flex mb-5 transform transition duration-500 hover:scale-105"
    >
      <img
        src={order.product.image}
        className="md:h-36 h-32 md:w-36 w-32 flex-none object-contain"
      />
      <div className="md:pt-5 flex-grow flex flex-col md:flex-row md:pl-10 pl-4">
        <div className="md:w-1/2">
          <p className="md:text-2xl text-xl text-green-500 font-bold">
            {order.product.name +
              (order.quantity > 1 ? `(${order.quantity})` : "")}
          </p>
          <p className="text-gray-400 hidden md:block">
            Seller: {order.seller.username}
          </p>
        </div>
        <span className="md:w-1/4 text-xl">
          ₹ {order.product.price * order.quantity}
        </span>
        <div className="md:w-1/4">
          <p className="font-bold text mt-3 md:mt-0 text-gray-700">
            Processing
          </p>
          <p className="text-gray-400 text-sm">
            Your order is currently being processed
          </p>
        </div>
      </div>
    </Link>
  );
}
