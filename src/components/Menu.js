import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="pt-24">
      <Link>
        <div className="w-full text-5xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          home
        </div>
      </Link>
      <Link>
        <div className="w-full text-5xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          categories
        </div>
      </Link>
      <Link>
        <div className="w-full text-5xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          my cart
        </div>
      </Link>
      <Link>
        <div className="w-full text-5xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          sign in
        </div>
      </Link>
      <Link>
        <div className="w-full text-5xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          sign up
        </div>
      </Link>
    </div>
  );
};

export default Menu;
