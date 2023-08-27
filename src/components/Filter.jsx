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
    const typeFields = [...new Set(data.docs.map((item) => item.type))];
  };

  const applyFilters = () => {
    setSelectedFilters({
      ...selectedFilters,
      status: filterFields.status,
      serial: filterFields.serial,
      type: filterFields.type,
    });
    setFilterFields({
      status: "",
      serial: "",
      type: "",
    });
  };

  const handleStatusChange = (e) => {
    setFilterFields({ ...filterFields, status: e.target.value });
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Search Capsules</label>
      <span className="relative">
        {/* <input
          type="text"
          className="border px-2 py-1 rounded"
          placeholder="Search by status"
          value={filterFields.status}
          onChange={handleStatusChange}
        /> */}
        <select
          className="border px-2 py-1 rounded"
          value={filterFields.status}
          onChange={handleStatusChange}
        >
          <option value="">Select Status</option>
          {statusFields.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </span>
      <span>
        <input
          type="text"
          className="border px-2 py-1 rounded ml-2 relative"
          placeholder="Search by serial"
          value={filterFields.serial}
          onChange={(e) =>
            setFilterFields({ ...filterFields, serial: e.target.value })
          }
        />
      </span>

      <input
        type="text"
        className="border px-2 py-1 rounded ml-2"
        placeholder="Search by type"
        value={filterFields.type}
        onChange={(e) =>
          setFilterFields({ ...filterFields, type: e.target.value })
        }
      />
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
}

export default Filter;
