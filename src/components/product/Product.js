import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { id, title, price, image } = props.data;
  return (
    <div className="transform transition duration-500 hover:scale-110 flex flex-col items-center overflow-x-hidden">
      <img src={image} alt={title} className="w-5/6 h-auto"></img>
      <div className="pt-5 w-5/6">
        <h3 className="text-sm md:text-lg lg:text-xl font-bold">{title}</h3>
        <span className="text-md md:text-xl lg:text-2xl font-bold text-green-600">
          ${price}
        </span>
      </div>
    </div>
  );
};

export default Product;
