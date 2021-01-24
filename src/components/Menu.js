import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const handleClick = () => {
    props.toggle();
  };
  return (
    <div className="pt-24">
      <Link to="/" onClick={handleClick}>
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
      <Link to="/signin" onClick={handleClick}>
        <div className="w-full text-5xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          sign in
        </div>
      </Link>
      <Link to="/signup" onClick={handleClick}>
        <div className="w-full text-5xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          sign up
        </div>
      </Link>
    </div>
  );
};

export default Menu;
