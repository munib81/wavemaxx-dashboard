"use client";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "@/components/animations/loading";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { IoOptionsOutline } from "react-icons/io5";

// import GoogleMap from "@/components/googleMap";
import dynamic from "next/dynamic";
// mqttClient import
import CardLineChart from "@/components/Cards/CardLineChart.js";
import CardBarChart from "@/components/Cards/CardBarChart.js";
import CardPageVisits from "@/components/Cards/CardPageVisits.js";
import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.js";

const GoogleMapCustom = dynamic(() => import("@/components/googleMap"), {
  ssr: false,
  // You can also pass loading component here if needed
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1); // Track the current page

  const { data: session, status } = useSession();
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

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <div className="min-h-screen">
      <div className="md:flex md:justify-between py-4">
        <div className="md:w-1/2 w-full">
          <h1 className="flex flex-row text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            SCUDA Dashboard
          </h1>
          {/* <p className="text-sm flex text-gray-500 dark:text-gray-400">
            Monitoring and Managing 15,000 units across 3 locations, 24/7 in the
            cloud.
          </p> */}
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
              tabIndex="-1"
              type="search"
              id="search-input"
              className="block rounded p-3 pl-10 w-full text-sm text-gray-900 bg-gray-200 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="Search by device ID..."
              required
            />
            <button
              type="submit"
              className="text-white absolute rounded right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium text-sm px-2 py-1 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>

      {loading ? <Loading /> : <GoogleMapCustom devices={devices} />}
      <br />
      <br />
    </div>
  );
}
