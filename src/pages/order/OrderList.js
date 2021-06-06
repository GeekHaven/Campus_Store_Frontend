import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import baseApiUrl from "../../constants/apiUrl";
import OrderListComponent from "../../components/order/OrderListComponent";
import UserContext from "../../context/UserContext";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { ReactComponent as CartImage } from "../../images/cart.svg";

export default function OrderList() {
  const user = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUserOrders = () => {
    setLoading(true);
    axios
      .get(`${baseApiUrl}/orders`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let fetchedOrders = res.data;
        setOrders(fetchedOrders);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchSellerOrders = () => {
    setLoading(true);
    axios
      .get(`${baseApiUrl}/seller/orders`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let fetchedOrders = res.data.orders;
        setOrders(fetchedOrders);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("user", user);
    user.type === "seller" ? fetchSellerOrders() : fetchUserOrders();
    console.log(orders);
  }, []);

  return (
    <div className="pt-32 xl:px-60 lg:px-32 md:px-10 px-3">
      {!loading ? (
        orders.length ? (
          orders.map((order) => (
            <OrderListComponent key={order._id} order={order} />
          ))
        ) : (
          <div className="flex flex-col h-96 justify-center items-center w-full ">
            <CartImage className="w-72" />
            <h2 className="text-gray-500 md:text-2xl text-xl mt-5 mb-5">
              {user.type === "seller"
                ? "No orders yet"
                : "You have not made any orders yet."}
            </h2>
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
            >
              {user.type === "seller"
                ? "Go back to Home"
                : "Go back to shopping"}
            </Link>
          </div>
        )
      ) : (
        <div className="flex h-96 justify-center items-center w-full ">
          <ReactLoading type="spin" color="#10b981" />
        </div>
      )}
    </div>
  );
}
