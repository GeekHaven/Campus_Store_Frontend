import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Menu = (props) => {
  const user = useContext(UserContext);
  const history = useHistory();
  const handleClick = () => {
    props.toggle();
  };
  return (
    <div className="pt-12 md:pt-24">
      <Link to="/" onClick={handleClick}>
        <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          home
        </div>
      </Link>
      {/* <Link>
        <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          categories
        </div>
      </Link> */}
      {/* <Link>
        <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
          my cart
        </div>
      </Link> */}
      {user.type === "seller" && (
        <Link to="/product/add" onClick={handleClick}>
          <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
            add product
          </div>
        </Link>
      )}

      {user.type === "admin" && (
        <Link to="/seller/add" onClick={handleClick}>
          <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
            add seller
          </div>
        </Link>
      )}

      {user.isLogged ? (
        <button
          onClick={() => {
            handleClick();
            props.logout();
            history.push("/signin");
          }}
        >
          <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
            log out
          </div>
        </button>
      ) : (
        <>
          <Link to="/signin" onClick={handleClick}>
            <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
              sign in
            </div>
          </Link>
          <Link to="/signup" onClick={handleClick}>
            <div className="w-full text-3xl md:text-6xl text-gray-800 hover:text-green-500 py-3 px-10 duration-500">
              sign up
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Menu;
