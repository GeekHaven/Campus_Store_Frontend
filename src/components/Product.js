import React from "react";

const Product = (props) => {
  const { title, price, image } = props.data;
  return (
    <div className="transform transition duration-500 hover:scale-110 flex flex-col items-center">
      <img src={image} alt={title} className="w-5/6 h-auto"></img>
      <div className="pt-5 w-5/6">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className="text-2xl font-bold text-green-600">${price}</span>
      </div>
    </div>
  );
};

export default Product;
