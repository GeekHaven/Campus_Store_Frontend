import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import baseApiUrl from "../../../apiUrl";
import "animate.css";
// import ReactLoading from "react-loading";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  // const [loading, setLoading] = useState(false);
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
    // setLoading(true);
    axios
      .post(`${baseApiUrl}/auth/signup`, user)
      .then(() => setDone(true))
      .catch((err) => setError(err.response.data.error));
  };
  return (
    <div className="h-screen flex justify-center items-center px-3">
      <form
        onSubmit={handleSubmit}
        class="bg-white w-full md:w-1/2 lg:w-1/3 rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            name="username"
            type="text"
            value={user.username}
            placeholder="Username"
            onChange={handleChange}
            required
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
            name="email"
            type="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            value={user.password}
            placeholder="**********"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {/* {loading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : (
              "Sign up"
            )} */}
            Sign up
          </button>
          <Link to="/signin">
            <button class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker duration-500 hover:text-green-500 text-right">
              Already signed up? Sign in here
            </button>
          </Link>
        </div>
      </form>
      {done && (
        <div className="h-screen w-screen fixed flex justify-center items-center animate__animated animate__fadeIn">
          <div className="p-10 bg-white rounded-xl shadow-xl flex flex-col justify-center items-center">
            <h3 className="text-bold text-green-500 text-3xl mb-5">
              You are signed up!
            </h3>
            <Link to="/signin">
              <span class="bg-green-500 flex-none hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded">
                Go to login
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
