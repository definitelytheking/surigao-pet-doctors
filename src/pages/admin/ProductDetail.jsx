// File path: src/components/ProductDetail.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "Products", id));
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-xl text-[#404040] font-bold">All Product</h1>
        <div className="flex justify-between items-center">
          <Link to={"/add-product"}>
            <button className="px-5 py-2 bg-[#00674f] border border-[#00674f] text-white font-poppins rounded-lg">
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full text-left border border-collapse sm:border-separate border-[#00674f] text-[#404040] font-poppins">
          <thead>
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100 font-bold fontPara"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100 font-bold fontPara"
              >
                Image
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
              >
                Title
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
              >
                Price
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
              >
                Category
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
              >
                Edit
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="text-pink-300">
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500">
                  {index + 1}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 first-letter:uppercase">
                  <img
                    src={product.productImage}
                    className="h-10 w-10 object-cover"
                    alt={product.productName}
                  />
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 first-letter:uppercase">
                  {product.productName}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 first-letter:uppercase">
                  ₱{product.productPrice}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 first-letter:uppercase">
                  {product.productCategory}
                </td>
                <td
                  className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-green-500 cursor-pointer"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </td>
                <td
                  className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
