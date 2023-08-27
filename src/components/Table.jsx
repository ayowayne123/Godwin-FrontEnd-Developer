"use client";
import { useEffect, useState } from "react";
import { useFilterContext } from "@/context/search.context";

function Table() {
  const { selectedFilters } = useFilterContext();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [check, setCheck] = useState([]);

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
    const response = await fetch(
      "https://api.spacexdata.com/v4/capsules/query",
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
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-semibold  uppercase mb-4">Capsules</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="grid grid-cols-5 items-center  w-full  bg-[#BAD0ED] uppercase font-semibold  divide-x divide-black border border-black">
              <th className="py-2">Capsule Serial</th>
              <th className="py-2">Capsule Type</th>
              <th className="py-2">Water Landings</th>
              <th className="py-2">Land Landings</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.serial}
                className="grid grid-cols-5 gap-y-2 py-2 items-center justify-center  w-full even:bg-blue-100  "
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
                <td className="flex tems-center justify-center">
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
                    {item.status}{" "}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="mr-2 px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-3 py-1 border rounded disabled:opacity-50`}
          disabled={currentPage === check.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
