import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center pt-10 ">
      <h1 className="font-poppins text-[50px] font-bold text-[#404040] pb-4">
        Admin Dashboard
      </h1>
      <div>
        <div className="py-5 flex justify-between items-center">
          {/* Add Product Button  */}
          <Link to={"/add-product"}>
            <button className="px-5 py-2 bg-[#00674f] border border-[#00674f] text-white rounded-lg">
              Add Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
