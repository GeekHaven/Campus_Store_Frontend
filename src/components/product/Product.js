import React from "react";

const Product = (props) => {
  const { name, price, image } = props.data;
  return (
    <div className="transform transition duration-500 hover:scale-110 flex flex-col items-center overflow-x-hidden">
      <div
        style={{
          backgroundImage: `url('${image}')`,
        }}
        className="w-full lg:h-72 md:h-60 h-48 bg-contain bg-no-repeat bg-center"
      ></div>

      <div className="pt-5 w-5/6">
        <h3 className="text-sm md:text-lg lg:text-xl font-bold text-center">
          {name}
        </h3>
        <span className="text-md md:text-xl lg:text-2xl font-bold text-green-600 block text-center">
          ₹{price}
        </span>
      </div>
    </div>
  );
};

export default Product;
