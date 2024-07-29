import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap ml-[2rem] mt-[2rem] font-poppins">
      {products.map((product) => (
        <div
          key={product.id}
          className="m-[20px] shadow-md flex flex-col items-center justify-center border-2 solid border-[#ededed] p-[20px] cursor-pointer max-w-[333px] max-h-[480[px]"
        >
          <img
            className="w-[226px] h-[226px] mb-[1rem]"
            src={product.productImage}
            alt={product.productName}
          />
          <div className="card-details">
            <h3 className="mb-[1rem] text-center font-semibold uppercase font-poppins">
              {product.productName}
            </h3>{" "}
            <div className="flex justify-around items-center mb-[1rem]">
              <p className="font-bold">₱ {product.productPrice}</p>{" "}
            </div>
            <div className="flex justify-center">
              <button className="bg-[#00674f] text-white py-[8px] px-[35px] rounded-xl">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
