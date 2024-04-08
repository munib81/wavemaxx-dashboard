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
            SCADA Dashboard
          </h1>
          {/* <p className="text-sm flex text-gray-500 dark:text-gray-400">
            Monitoring and Managing 15,000 units across 3 locations, 24/7 in the
            cloud.
          </p> */}
        </div>
        <br />
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
