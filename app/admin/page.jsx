"use client";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "@/components/animations/loading";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoOptionsOutline } from "react-icons/io5";
import { TbDeviceHeartMonitorFilled, TbFlagPlus } from "react-icons/tb";
import Devices from "@/components/admin/devices";
import { FaPlus } from "react-icons/fa";
// import GogleMap from "@/components/googleMap";
import dynamic from "next/dynamic";

const GoogleMapCustom = dynamic(() => import("@/components/googleMap"), {
  ssr: false,
  // You can also pass loading component here if needed
});

export default function Page() {
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1); // Track the current page
  const [searchInput, setSearchInput] = useState(""); // State to store search input value

  const { data: session, status } = useSession();

  const fetchDevices = () => {
    setLoading(true);
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    const searchInput = document.getElementById("search-input");

    window.addEventListener("keydown", (event) => {
      if (event.key === "/") {
        event.preventDefault();
        searchInput.focus();
      }
      if (event.key === "Escape") {
        window.location.reload();
        // searchInput.blur();
      }
    });
  }, []); // Remove 'sort' from dependencies

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
        setLoading(false);
      });
  }, []);

  const [selectedDeviceType, setSelectedDeviceType] =
    useState("Gateway Device");

  const handleRadioChange = (e) => {
    setSelectedDeviceType(e.target.value);
  };
  // Filter devices based on selectedDeviceType and search input

  const filteredDevices = selectedDeviceType
    ? devices.filter(
        (device) =>
          device.type === selectedDeviceType &&
          device.GatewayId.includes(searchInput)
      )
    : devices;

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value); // Update search input value
  };

  return (
    <div className=" min-h-screen">
      <div className="md:flex md:justify-between py-4">
        <div className="md:w-1/2 w-full">
          <h1 className="flex flex-row text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Admin Portal
          </h1>
          <p className="text-sm flex text-gray-500 dark:text-gray-400">
            Create, edit, and manage devices.
          </p>
        </div>
        <br />

        <form className="md:w-1/3 w-full ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search-input"
              value={searchInput} // Bind value to searchInput state
              onChange={handleSearchInputChange} // Handle input change
              className="block rounded p-3 pl-10 w-full text-sm text-gray-900 bg-gray-200 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Search by gateway ID..."
              required
            />
            {/* No need for button inside search input */}
          </div>
        </form>
      </div>
      <div className="rounded-lg mx-auto mb-4 w-full relative overflow-hidden">
        <div className="w-full h-full block">
          <div className="md:flex items-center md:justify-between justify-normal">
            <div className="flex w-full max-w-xl">
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value="Gateway Device"
                      onChange={handleRadioChange}
                      checked={selectedDeviceType === "Gateway Device"} // Set checked attribute based on selectedDeviceType
                      name="list-radio"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-license" // Use htmlFor instead of for for label
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Gateway Device
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value="LWMS RTU"
                      onChange={handleRadioChange}
                      checked={selectedDeviceType === "LWMS RTU"} // Set checked attribute based on selectedDeviceType
                      name="list-radio"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-id" // Use htmlFor instead of for for label
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      LWMS RTU
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-military"
                      type="radio"
                      value="AMS RTU"
                      onChange={handleRadioChange}
                      checked={selectedDeviceType === "AMS RTU"} // Set checked attribute based on selectedDeviceType
                      name="list-radio"
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-military" // Use htmlFor instead of for for label
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      AMS RTU
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            {/* create device button here */}
            <div className="flex">
              <Link
                href="/admin/create"
                className="bg-teal-700 flex space-x-2 hover:bg-teal-800 text-white py-2 px-2 rounded"
              >
                <FaPlus className="mr-2 my-auto " />
                Create Device
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mb-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDevices.map((deviceDetails) => (
          <Devices
            key={deviceDetails._id}
            deviceDetails={deviceDetails}
            onUpdate={fetchDevices} // Pass fetchDevices as a prop
          />
        ))}
      </div>

      {loading ? <Loading /> : <GoogleMapCustom devices={filteredDevices} />}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
