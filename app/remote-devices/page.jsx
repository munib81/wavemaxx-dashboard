"use client";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "@/components/animations/loading";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoOptionsOutline } from "react-icons/io5";

// import GoogleMap from "@/components/googleMap";
import dynamic from "next/dynamic";
// mqttClient import

const GoogleMapCustom = dynamic(() => import("@/components/googleMap"), {
  ssr: false,
  // You can also pass loading component here if needed
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1); // Track the current page

  const { data: session, status } = useSession();
  const [devices, setDevices] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // State to store search input value

  useEffect(() => {
    setLoading(true);
    fetch("/api/devices")
      .then((res) => res.json())
      .then((data) => {
        // filter out devices with type == gateway
        data = data.filter((device) => device.type !== "Gateway Device");
        setDevices(data);
        setLoading(false);
      });
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

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value); // Update search input value
  };

  const filteredDevices = devices.filter((device) =>
    device.GatewayId.includes(searchInput)
  ); // Filter devices based on GatewayId matching search input

  return (
    <div className="min-h-screen">
      <div className="md:flex md:justify-between py-4">
        <div className="md:w-1/2 w-full">
          <h1 className="flex flex-row text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Remote Devices
          </h1>
          <p className="text-sm flex text-gray-500 dark:text-gray-400">
            This is a list of all the remote devices that are currently active
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
      {loading ? <Loading /> : <GoogleMapCustom devices={filteredDevices} />}
      <br />
      <br />
    </div>
  );
}
