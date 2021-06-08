import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import baseApiUrl from "../../constants/apiUrl";
import UserContext from "../../context/UserContext";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

export default function ProductPage({ match }) {
  const user = useContext(UserContext);
  const productId = match.params.id;
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = () => {
    setLoading(true);
    axios
      .get(`${baseApiUrl}/product/${productId}`)
      .then((res) => {
        let fetchedProduct = res.data;
        setProduct(fetchedProduct);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const deleteProduct = () => {
    setDeleting(true);
    axios
      .delete(`${baseApiUrl}/product/${productId}`, {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleting(false);
      });
  };
  return loading ? (
    <div className="px-5 md:px-12 lg:px-24 pt-10 md:pt-16 lg:pt-24">
      <div className="flex h-96 justify-center items-center w-full ">
        <ReactLoading type="spin" color="#10b981" />
      </div>
    </div>
  ) : (
    <div className="px-5 md:px-12 lg:px-24 pt-24 md:pt-0">
      <div className="flex flex-col md:flex-row">
        <div className="flex justify-center items-center md:w-1/2 md:min-h-screen">
          <img
            className="h-60 md:h-auto md:w-1/2"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="py-5 md:w-1/2 md:min-h-screen flex flex-col justify-center">
          <h2 className="text-2xl lg:text-4xl text-center md:text-left text-green-500 font-bold">
            {product.name}
          </h2>
          <p className="pt-2">{product.description}</p>
          <p className="text-gray-400">Seller: {product.seller?.username} </p>
          <p className="text-gray-400">
            {product.stock > 3 ? (
              "In stock"
            ) : product.stock === 0 ? (
              <span className="text-red-400">OUT OF STOCK</span>
            ) : (
              `Only ${product.stock} left in stock`
            )}
          </p>
          <div className="pt-5 flex justify-between lg:flex-col lg:justify-start">
            <span className="text-3xl lg:text-4xl font-bold text-green-500">
              {"₹ " + product.price}
            </span>

            {user.type !== "seller" ? (
              product.stock ? (
                <Link
                  to={`/products/${productId}/order`}
                  class="bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded lg:mt-4 lg:w-36 lg:text-3xl text-center"
                >
                  Buy
                </Link>
              ) : (
                ""
              )
            ) : user.details.id === product.seller?._id ? (
              <div className="flex mt-5 text-2xl">
                <Link
                  to={`/products/${productId}/edit`}
                  className="hover:text-green-500 duration-500 text-gray-400 font-bold pr-4"
                >
                  <PencilIcon className="w-8" />
                </Link>
                <button
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                  className="hover:text-red-500 duration-500 text-gray-400 font-bold pr-4"
                >
                  <TrashIcon class="w-8" />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {deleteModal && (
        <div
          style={{ zIndex: 9999 }}
          className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center animate__animated animate__fadeIn px-10 bg-opacity-50 bg-gray-500"
        >
          <div className="animate__animated animate__zoomIn animate__faster p-10 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center md:w-96">
            <h3 className="text-bold text-center text-green-500 text-3xl mb-5">
              {deleted
                ? "Product was deleted successfully"
                : " Are you sure you want to delete this product?"}
            </h3>
            {deleted ? (
              <Link to="/">
                <span class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded">
                  Go back home
                </span>
              </Link>
            ) : (
              <div className="flex mt-3 w-full justify-between">
                <button
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                >
                  <span class="text-gray-400 hover:text-gray-500 duration-500 font-bold py-2 px-4 rounded">
                    Cancel
                  </span>
                </button>
                <button onClick={deleteProduct}>
                  <span class="bg-red-400 hover:bg-red-500 duration-500 text-white font-bold py-2 px-4 rounded">
                    {deleting ? (
                      <ReactLoading type="spin" height={20} width={20} />
                    ) : (
                      "Delete"
                    )}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
