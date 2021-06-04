import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import baseApiUrl from "../../constants/apiUrl";
import OrderListComponent from "../../components/order/OrderListComponent";
import UserContext from "../../context/UserContext";

export default function OrderList() {
  const user = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const fetchOrders = () => {
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
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="pt-32 xl:px-60 lg:px-32 md:px-10 px-3">
      {orders.map((order) => (
        <OrderListComponent key={order._id} order={order} />
      ))}
    </div>
  );
}
