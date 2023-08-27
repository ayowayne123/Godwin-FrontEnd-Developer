"use client";
import React, { useState, useEffect } from "react";
import { useFilterContext } from "@/context/search.context";

function Filter() {
  const { selectedFilters, setSelectedFilters } = useFilterContext();

  const [filterFields, setFilterFields] = useState({
    status: "",
    serial: "",
    type: "",
  });
  const [statusFields, setStatusFields] = useState([]);
  const [serialFields, setSerialFields] = useState([]);
  const [typeFields, setTypeFields] = useState([]);

  useEffect(() => {
    fetchFilter();
  }, []);

  const fetchFilter = async () => {
    const response = await fetch(
      "https://api.spacexdata.com/v4/capsules/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          options: {
            pagination: false,
          },
        }),
      }
    );

    const data = await response.json();
    const statusFields = [...new Set(data.docs.map((item) => item.status))];
    setStatusFields(statusFields);
    const serialFields = [...new Set(data.docs.map((item) => item.serial))];
    setSerialFields(serialFields);
    const typeFields = [...new Set(data.docs.map((item) => item.type))];
    setTypeFields(typeFields);
  };

  const applyFilters = () => {
    setSelectedFilters({
      ...selectedFilters,
      status: filterFields.status,
      serial: filterFields.serial,
      type: filterFields.type,
      currentPage: 1,
    });
    setFilterFields({
      status: "",
      serial: "",
      type: "",
    });

    console.log(selectedFilters);
  };

  const handleStatusChange = (e) => {
    setFilterFields({ ...filterFields, status: e.target.value });
  };

  return (
    <div className=" w-full container flex flex-col py-8">
      <div className="text-2xl font-semibold  uppercase mb-4">
        Search Capsules
      </div>
      <div className="w-full grid sm:grid-cols-3  gap-8 text-sm py-3">
        <span className="relative appearance-none border-b outline-none border-spaceblue w-full">
          <select
            className=" px-2 py-2 outline-none  w-full"
            value={filterFields.status}
            onChange={handleStatusChange}
          >
            <option value="">Select Capsule Status</option>
            {statusFields.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </span>

        <span className="relative appearance-none border-b outline-none border-spaceblue w-full">
          <select
            className=" px-2 py-2 outline-none  w-full"
            value={filterFields.serial}
            onChange={(e) =>
              setFilterFields({ ...filterFields, serial: e.target.value })
            }
          >
            <option value="">Select Serial Number</option>
            {serialFields.map((serial) => (
              <option key={serial} value={serial}>
                {serial}
              </option>
            ))}
          </select>
        </span>
        <span className="relative appearance-none border-b outline-none border-spaceblue w-full">
          <select
            className=" px-2 py-2 outline-none  w-full"
            value={filterFields.type}
            onChange={(e) =>
              setFilterFields({ ...filterFields, type: e.target.value })
            }
          >
            <option value="">Select Capsule Type</option>
            {typeFields.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </span>
      </div>
      <span className="flex w-full justify-end ">
        <button
          className="w-52 text-white px-3 py-2 bg-spaceblue rounded-2xl hover:bg-white hover:text-spaceblue hover:border-spaceblue hover:border h-12"
          onClick={applyFilters}
        >
          Apply Filters
        </button>{" "}
      </span>
    </div>
  );
}

export default Filter;
