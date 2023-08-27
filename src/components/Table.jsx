"use client";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/context/search.context";
import CapsulePopup from "./CapsulePopup";

function Table() {
  const { selectedFilters } = useFilterContext();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [check, setCheck] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedFilters]);

  const fetchData = async () => {
    const filters = {};
    if (selectedFilters.status) {
      filters.status = selectedFilters.status;
      console.log(selectedFilters.status, filters), 123;
    }
    if (selectedFilters.serial) filters.serial = selectedFilters.serial;
    if (selectedFilters.type) filters.type = selectedFilters.type;
    if (selectedFilters.currentPage === 1) {
      setCurrentPage(1);
    }

    const response = await fetch(
      `https://test.thinktech.ng/?key=${authToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          options: {
            page: currentPage,
            limit: itemsPerPage,
          },
          query: Object.keys(filters).length > 0 ? filters : undefined,
        }),
      }
    );
    const main = await response.json();
    const data = main.docs;
    setCheck(main);
    setData(data);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold  uppercase mb-4">Capsules</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="grid sm:grid-cols-5  grid-cols-4 items-center  w-full  bg-[#BAD0ED] uppercase font-semibold text-xs lg:text-base divide-x divide-black border border-black">
              <th className="py-2">Capsule Serial</th>
              <th className="py-2">Capsule Type</th>
              <th className="py-2">Water Landings</th>
              <th className="py-2">Land Landings</th>
              <th className="py-2 sm:block hidden ">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                onClick={() => {
                  setSelectedCapsule(item);
                  setShowPopup(true);
                }}
                key={item.serial}
                className="grid sm:grid-cols-5  grid-cols-4  gap-y-2 py-2 items-center justify-center  w-full even:bg-blue-100  cursor-pointer hover:bg-slate-300  "
              >
                <td className="flex tems-center justify-center">
                  {item.serial}
                </td>
                <td className="flex tems-center justify-center">{item.type}</td>
                <td className="flex tems-center justify-center">
                  {item.water_landings}
                </td>
                <td className="flex tems-center justify-center">
                  {item.land_landings}
                </td>
                <td className="flex flex-row items-center sm:justify-center col-span-4 sm:col-span-1 justify-start">
                  <span className="flex sm:hidden px-5">Status:</span>
                  <span
                    className={`py-1 flex w-24 justify-center text-sm items-center rounded-lg ${
                      item.status === "unknown" && "bg-blue-300 text-blue-600"
                    }
                      ${
                        item.status === "active" &&
                        "bg-green-300 text-green-600"
                      } ${
                      item.status === "destroyed" &&
                      "bg-yellow-300 text-yellow-600"
                    } ${
                      item.status === "retired" && "bg-red-300 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-6 justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 bg-pink-600 text-bold text-white py-1  rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {check.page ? check.page : 1} of{" "}
          {check.totalPages ? check.totalPages : 1}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 bg-pink-600 text-bold text-white py-1  rounded disabled:opacity-50`}
          disabled={currentPage === check.totalPages}
        >
          Next
        </button>
      </div>
      {showPopup && (
        <CapsulePopup
          capsule={selectedCapsule}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default Table;
