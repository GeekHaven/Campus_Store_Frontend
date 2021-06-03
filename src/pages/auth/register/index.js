import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "animate.css";
import ReactLoading from "react-loading";
import baseApiUrl from "../../../constants/apiUrl";
import UserContext from "../../../context/UserContext";

const Register = ({ forSeller }) => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    let { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    if (forSeller) {
      axios
        .post(`${baseApiUrl}/seller/signup`, user, {
          headers: {
            authorization: `Bearer ${userContext.token}`,
          },
        })
        .then(() => setDone(true))
        .catch((err) =>
          setError(
            err?.response?.data?.error
              ? err.response.data.error
              : "Something went wrong. Please try again in a while"
          )
        )
        .finally(() => setLoading(false));
    } else {
      axios
        .post(`${baseApiUrl}/auth/signup`, user)
        .then(() => setDone(true))
        .catch((err) =>
          setError(
            err?.response?.data?.error
              ? err.response.data.error
              : "Something went wrong. Please try again in a while"
          )
        )
        .finally(() => setLoading(false));
    }
  };
  return (
    <div className="h-screen flex justify-center items-center px-3">
      <form
        onSubmit={handleSubmit}
        class="bg-white w-full md:w-1/2 lg:w-1/3 rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="username"
            type="text"
            value={user.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="email"
            type="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            Password
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            name="password"
            type="password"
            value={user.password}
            placeholder="**********"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div class="flex flex-row-reverse items-center justify-between">
          <button
            class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {loading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : forSeller ? (
              "Add Seller"
            ) : (
              "Sign up"
            )}
          </button>
          {!forSeller && (
            <Link to="/signin">
              <button class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker duration-500 hover:text-green-500 text-right">
                Already signed up? Sign in here
              </button>
            </Link>
          )}
        </div>
      </form>
      {done && (
        <div
          style={{ zIndex: 9999, backdropFilter: "blur(15px)" }}
          className="h-screen w-screen fixed flex justify-center items-center animate__animated animate__fadeIn px-10 bg-opacity-50 bg-gray-500"
        >
          <div className="p-10 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-bold text-center text-green-500 text-3xl mb-5">
              {forSeller ? "Seller is added!" : "You are signed up!"}
            </h3>
            {forSeller ? (
              <Link to="/">
                <span class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded">
                  Close
                </span>
              </Link>
            ) : (
              <Link to="/signin">
                <span class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded">
                  Go to login
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
