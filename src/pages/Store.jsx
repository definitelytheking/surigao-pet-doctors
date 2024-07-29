import React from "react";
import ProductCard from "../components/ProductCard";

const Store = () => {
  return (
    <div className="max-w-[1152px] mx-auto">
      <div className="flex flex-col items-center py-10">
        <h1 className="font-poppins text-[50px] font-bold text-[#404040] pb-4">
          Store
        </h1>
        <input
          type="text"
          placeholder="Enter your search products"
          className="w-[500px] h-[50px] border border-[#00674f] px-4 rounded-2xl text-[18px] font-poppins font-medium"
        />
      </div>
      <div className="grid grid-rows-none grid-auto-rows place-content-center">
        <ProductCard />
      </div>
    </div>
  );
};

export default Store;
