import React from "react";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        {["All Products", "Shampoo", "Toys", "Foods", "Accessories"].map(
          (category) => (
            <button
              key={category}
              className={`py-2 m-[5px] px-5 border border-[#cccccc] cursor-pointer rounded-[5px] text-[#00674f] ${
                selectedCategory === category ? "bg-[#00674f] text-white" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Category;
