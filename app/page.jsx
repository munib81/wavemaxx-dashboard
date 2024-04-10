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
import InfoChart from "@/components/Cards/infoChart.js";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

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
            SCADA Dashboard
          </h1>
          {/* <p className="text-sm flex text-gray-500 dark:text-gray-400">
            Monitoring and Managing 15,000 units across 3 locations, 24/7 in the
            cloud.
          </p> */}
        </div>
        <br />
      </div>

      <div className="w-full ">
        <div className="bg-blue-600 p-14 rounded-lg shadow-md" />
        <div className="grid -mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-8">
          <div className="flex items-start p-4 rounded-xl shadow-md bg-white border">
            <div className="flex items-center justify-center bg-blue-50 h-12 w-12 rounded-full border border-blue-100">
              <svg
                className="h-6 w-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokewidth="2"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  strokelinecap="round"
                  strokelinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">Gateway Devices</h2>
              <p className="mt-2 text-sm text-gray-500">2 Gateways connected</p>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-xl shadow-md bg-white border">
            <div className="flex items-center justify-center bg-orange-50 h-12 w-12 rounded-full border border-orange-100">
              <svg
                className="h-6 w-6 text-orange-400"
                fill="none"
                stroke="currentColor"
                strokewidth="2"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  strokelinecap="round"
                  strokelinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">Remote Devices</h2>
              <p className="mt-2 text-sm text-gray-500">4 RTU devices</p>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-xl shadow-md bg-white border">
            <div className="flex items-center justify-center bg-red-50 h-12 w-12 rounded-full border border-red-100">
              <svg
                className="h-6 w-6 text-red-400"
                fill="none"
                stroke="currentColor"
                strokewidth="2"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  strokelinecap="round"
                  strokelinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">System Logs</h2>
              <p className="mt-2 text-sm text-gray-500">
                18 new logs since last week
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 rounded-xl shadow-md bg-white border">
            <div className="flex items-center justify-center bg-indigo-50 h-12 w-12 rounded-full border border-indigo-100">
              <svg
                className="h-6 w-6 text-indigo-400"
                fill="none"
                stroke="currentColor"
                strokewidth="2"
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  strokelinecap="round"
                  strokelinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">Notifications</h2>
              <p className="mt-2 text-sm text-gray-500">8 new notifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" flex items-center justify-center">
        <div className="w-96 rounded-xl shadow-md p-5 border border-gray-50 bg-white border">
          <p className="text-gray-700 text-lg">8.79 GB of 15 GB storage used</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
            <div
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: 58 + "%" }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            You've got 15 GB of storage
          </p>
        </div>
      </div> */}
      <div className="flex flex-wrap mt-10">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <InfoChart />
        </div>
      </div>
      <br />
      <br />
      {loading ? <Loading /> : <GoogleMapCustom devices={devices} />}
      <br />
      <br />
    </div>
  );
}
