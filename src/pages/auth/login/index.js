import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import baseApiUrl from "../../../apiUrl";
import ReactLoading from "react-loading";

const Login = (props) => {
  const history = useHistory();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
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
    axios
      .post(`${baseApiUrl}/auth/login`, user)
      .then((res) => {
        let userData = res.data;
        props.login(userData.token, userData.tokenUser);
        window.localStorage.setItem("token", userData.token);
        history.push("/");
      })
      .catch((err) =>
        setError(
          err?.response?.data?.error
            ? err.response.data.error
            : "Something went wrong. Please try again in a while"
        )
      )
      .finally(() => setLoading(false));
  };
  return (
    <div className="h-screen flex justify-center items-center px-3">
      <form
        onSubmit={handleSubmit}
        class="bg-white w-full md:w-1/2 lg:w-1/3 rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            name="email"
            type="email"
            value={user.email}
            placeholder="john@snow.com"
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
            placeholder="********"
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div class="flex flex-row-reverse items-center justify-between">
          <button
            class="bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {loading ? (
              <ReactLoading type="spin" height={20} width={20} />
            ) : (
              "Sign In"
            )}
          </button>
          <Link to="/signup">
            <button
              class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker duration-500 hover:text-green-500 text-right"
              type="button"
            >
              New? Sign up first
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
