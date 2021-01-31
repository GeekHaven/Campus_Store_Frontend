import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-screen flex justify-center items-center px-3">
      <div class="bg-white w-full md:w-1/2 lg:w-1/3 rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
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
            type="text"
            placeholder="Username"
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
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-green-500 hover:bg-green-600 duration-500 text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
          <Link to="/signup">
            <button class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker duration-500 hover:text-green-500 text-right">
              New? Sign up first
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
