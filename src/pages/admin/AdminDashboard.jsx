import React, { useEffect, useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import ProductDetail from "./ProductDetail";
import OrderDetail from "./OrderDetail";
import UserDetail from "./UserDetail";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        setTotalProducts(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center pt-10 max-w-[1152px] mx-auto">
      <h1 className="font-poppins text-[50px] font-bold text-[#404040] pb-4">
        Admin Dashboard
      </h1>
      <div className="py-5 w-full">
        <Tabs>
          <TabList className="flex flex-wrap -m-4 text-center justify-center">
            {/* Total Products */}
            <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
              <div className="border bg-[#f5f5f5] hover:bg-[#f0f0f0] border-[#00674f] px-4 py-3 rounded-xl">
                <div className="text-[#00674f] w-12 h-12 mb-3 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={50}
                    height={50}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-basket"
                  >
                    <path d="m5 11 4-7" />
                    <path d="m19 11-4-7" />
                    <path d="M2 11h20" />
                    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                    <path d="m9 11 1 9" />
                    <path d="M4.5 15.5h15" />
                    <path d="m15 11-1 9" />
                  </svg>
                </div>
                <h2 className="title-font font-medium text-3xl text-[#00674f] font-poppins">
                  {totalProducts}
                </h2>
                <p className="text-[#00674f] font-poppins font-bold">
                  Total Products
                </p>
              </div>
            </Tab>
            {/* Total Order */}
            <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
              <div className="border bg-[#f5f5f5] hover:bg-[#f0f0f0] border-[#00674f] text-[#00674f] px-4 py-3 rounded-xl">
                <div className="text-[#00674f] w-12 h-12 mb-3 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={50}
                    height={50}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-list-ordered"
                  >
                    <line x1={10} x2={21} y1={6} y2={6} />
                    <line x1={10} x2={21} y1={12} y2={12} />
                    <line x1={10} x2={21} y1={18} y2={18} />
                    <path d="M4 6h1v4" />
                    <path d="M4 10h2" />
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                  </svg>
                </div>
                <h2 className="title-font font-medium text-3xl text-[#00674f] font-poppins">
                  10
                </h2>
                <p className="text-[#00674f] font-bold">Total Order</p>
              </div>
            </Tab>
            {/* Total User */}
            <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
              <div className="border bg-[#f5f5f5] hover:bg-[#f0f0f0] border-[#00674f] px-4 py-3 rounded-xl">
                <div className="text-[#00674f] w-12 h-12 mb-3 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={50}
                    height={50}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h2 className="title-font font-medium text-3xl text-[#00674f] font-poppins">
                  10
                </h2>
                <p className="text-[#00674f] font-bold">Total User</p>
              </div>
            </Tab>
          </TabList>

          <TabPanel>
            <ProductDetail />
          </TabPanel>
          <TabPanel>
            <OrderDetail />
          </TabPanel>
          <TabPanel>
            <UserDetail />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
