import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="w-screen fixed z-10 bg-white bg-opacity-90 flex justify-between items-center px-5 md:px-12 lg:px-24 py-5">
      <button
        onClick={props.toggle}
        className="w-36  text-left duration-500 hover:text-green-500"
      >
        MENU
      </button>{" "}
      <Link to="/">
        <div className="text-xl md:text-2xl lg:text-4xl font-bold">
          CAMPUS<span className="text-green-500">STORE</span>
        </div>
      </Link>
      {props.auth.state ? (
        <a className="w-36 text-right">
          <span className=" duration-500 hover:text-green-500">
            {props.auth.user.username}
          </span>
        </a>
      ) : (
        <Link className="w-36 text-right" to="/signin">
          <span className=" duration-500 hover:text-green-500">LOGIN</span>
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
