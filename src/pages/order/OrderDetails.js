import axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import Stepper from "../../components/order/Stepper";
import baseApiUrl from "../../constants/apiUrl";
import UserContext from "../../context/UserContext";

export default function OrderDetails({ orderId }) {
  const user = useContext(UserContext);
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchOrder = () => {
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
  useEffect(() => {
    fetchOrder();
  }, []);
  return loading ? (
    <div></div>
  ) : (
    <div className="pt-32 xl:px-60 lg:px-32 md:px-10 px-3">
      <div className="flex items-center mb-10">
        <div className="w-1/2 flex justify-end pr-24">
          <img src={order.product.image} alt="" className="w-60" />
        </div>

        <div className="flex-grow text-gray-700 text-xl w-1/2">
          <p className="font-bold text-green-500 text-3xl mb-5">
            {order.product.name}
          </p>
          <p>Seller: {order.seller.username}</p>
          <p>Order date: {moment(order.createdAt).format("MMMM Do YYYY")}</p>
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
        <span className="text-xl text-green-500">
          {order.delivered
            ? "Delivered"
            : order.outForDelivery
            ? "Out for delivery"
            : order.confirmed
            ? "Confirmed"
            : "Processing"}
        </span>
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
      </div>
    </div>
  );
}
