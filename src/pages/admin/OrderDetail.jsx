import React from "react";

const OrderDetail = () => {
  return (
    <div>
      <div>
        <div className="py-5">
          {/* text  */}
          <h1 className=" text-xl text-[#404040] font-bold">All Order</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-[#00674f] text-[#404040] font-poppins">
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100 font-bold"
                >
                  S.No.
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
                >
                  Location Name
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-[#00674f] text-[#00674f] bg-slate-100"
                >
                  Action
                </th>
              </tr>
              <tr className="text-[#00674f]">
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 ">
                  1.
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 first-letter:uppercase ">
                  {"name"}
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                  Edit
                </td>
                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-[#00674f] stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                  Delete
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
