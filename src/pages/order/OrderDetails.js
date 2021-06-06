import axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import Stepper from "../../components/order/Stepper";
import baseApiUrl from "../../constants/apiUrl";
import UserContext from "../../context/UserContext";
import ReactLoading from "react-loading";

export default function OrderDetails({ orderId }) {
  const user = useContext(UserContext);
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchUserOrder = () => {
    setLoading(true);
    axios
      .get(`${baseApiUrl}/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let fetchedOrder = res.data;
        setOrder(fetchedOrder);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchSellerOrder = () => {
    setLoading(true);
    axios
      .get(`${baseApiUrl}/seller/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        let fetchedOrder = res.data;
        setOrder(fetchedOrder);
        console.log(order);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    user.type === "seller" ? fetchSellerOrder() : fetchUserOrder();
  }, []);

  return (
    <div className="pt-32 xl:px-60 lg:px-32 md:px-10 px-3">
      {!loading ? (
        <>
          {" "}
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="md:w-1/2 flex md:justify-end justify-center lg:pr-24 md:pr-16 pr-0 mb-5 md:mb-0">
              <img src={order.product.image} alt="" className="md:w-60 w-36" />
            </div>

            <div className="flex-grow text-gray-700 text-xl md:w-1/2">
              <p className="font-bold text-green-500 text-3xl mb-5 text-center md:text-left">
                {order.product.name}
              </p>
              {user.type === "seller" ? (
                <p>Buyer: {order.user.username}</p>
              ) : (
                <p>Seller: {order.seller.username}</p>
              )}
              <p>
                Order date: {moment(order.createdAt).format("MMMM Do YYYY")}
              </p>
              <p>Price: ₹ {order.product.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>
                Total:
                <span className="text-green-500 text-3xl font-bold">
                  {" ₹ " + order.quantity * order.product.price}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Stepper
              step={
                order.delivered
                  ? 3
                  : order.outForDelivery
                  ? 2
                  : order.confirmed
                  ? 1
                  : 0
              }
            />
          </div>{" "}
        </>
      ) : (
        <div className="flex h-96 justify-center items-center w-full ">
          <ReactLoading type="spin" color="#10b981" />
        </div>
      )}
    </div>
  );
}
