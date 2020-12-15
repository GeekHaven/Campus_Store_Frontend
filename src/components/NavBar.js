import React from "react";

const NavBar = (props) => {
  return (
    <nav className="w-screen fixed z-10 bg-white bg-opacity-90 flex justify-between items-center px-24 py-5">
      <button
        onClick={props.toggle}
        className="w-36 text-left duration-500 hover:text-green-500"
      >
        MENU
      </button>{" "}
      <div className="text-4xl font-bold">
        CAMPUS<span className="text-green-500">STORE</span>
      </div>{" "}
      <button className="w-36 text-right duration-500 hover:text-green-500">
        LOGIN
      </button>
    </nav>
  );
};

export default NavBar;
