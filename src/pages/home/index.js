import React from "react";
import ProductContainer from "../../components/home/ProductContainer";

const Home = ({ forSeller }) => {
  return (
    <div className="px-5 md:px-12 lg:px-24 pt-10 md:pt-16 lg:pt-24">
      {/* <Carousel /> */}
      <ProductContainer forSeller={forSeller} />
    </div>
  );
};

export default Home;
