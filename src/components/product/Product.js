import React from "react";

const Product = (props) => {
  const { name, price, image } = props.data;
  return (
    <div className="group transform transition duration-500 hover:scale-110 flex flex-col items-center overflow-x-hidden">
      <div
        style={{
          backgroundImage: `url('${image}')`,
        }}
        className="relative w-full lg:h-72 md:h-60 h-48 bg-contain bg-no-repeat bg-center"
      >
        <div className="md:w-20 md:h-20 w-16 h-16 absolute -bottom-5 xl:right-5 right-0  rounded-full flex justify-center items-center bg-green-500 bg-opacity-90 text-white font-bold md:text-xl group-hover:bg-opacity-100 duration-500">
          ₹{price}
        </div>
      </div>

      <div className="pt-5 w-5/6">
        <h3 className="text-sm md:text-lg lg:text-xl font-bold text-center">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default Product;
