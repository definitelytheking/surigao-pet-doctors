import React from "react";
const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-wrap ml-[2rem] mt-[2rem] font-poppins">
      <div className="m-[20px] shadow-xl flex flex-col items-center justify-center border-2 border-[#ededed] p-[20px] cursor-pointer max-w-[352px] max-h-[480px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
        <img
          className="w-[226px] h-[226px] mb-[1rem] object-cover rounded-lg"
          src={product.productImage}
          alt={product.productName}
        />
        <div>
          <h3 className="mb-[1rem] text-center uppercase font-poppins text-[#09192C]">
            {product.productName}
          </h3>{" "}
          <div className="flex justify-around items-center mb-[1rem]">
            <p className="font-semibold text-xl text-[#09192C]">
              ₱ {product.productPrice}
            </p>{" "}
          </div>
          <div className="flex justify-center">
            <button className="bg-[#00674f] text-white py-[10px] px-[40px] rounded-xl transition duration-200 transform hover:bg-[#005a45]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
