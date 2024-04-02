"use client";

import React, { useState } from "react";
import {
  TbCoinRupee,
  TbCurrencyRupee,
  TbReload,
  TbTruckReturn,
} from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import Sidebar from "@/components/sidebar";
import { GiWeight } from "react-icons/gi";
import { MdAdminPanelSettings, MdOutlineAddChart } from "react-icons/md";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { GrNotification } from "react-icons/gr";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";

export default function Navbar({ children }) {
  ///const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log("Authentication State:", isAuthenticated, user);

  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);

  // const user = {
  //   name: "Ayush",
  //   picture: "https://avatars.githubusercontent.com/u/44462972?v=4",
  //   email: "wara@gmail.com",
  // };

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = usePathname();
  console.log("Location:", location);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const isTabActive = (path) => {
    return location.pathname === path;
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  if (location.includes("/login") || location.includes("/register")) {
    return <>{children}</>;
  }

  return (
    <div className=" min-h-screen bg-gray-100 leading-tight">
      <nav className="sticky md:top-3 top-0 md:w-[92%] w-full bg-white md:shadow md:rounded-lg md:left-24 z-30 ">
        <div className="px-2 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex cursor-pointer cursor-text">
              <Link href="/">
                <div className="flex items-center">
                  {/* <TbCoinRupee className="w-8 h-8 text-green-500" /> */}
                  <span className="text-xl font-semibold text-gray-800">
                    {" "}
                    WaveMaxx
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="border-r-2 flex border-gray-200 h-full pr-2 ">
                <Link
                  href="/admin"
                  className="flex group items-center justify-center p-2 text-sm h-full text-black rounded-md bg-indigo-200 hover:bg-indigo-300  focus:outline-none  "
                >
                  <MdAdminPanelSettings className="w-5 h-5 mr-1" /> Super Admin
                </Link>
              </div>
              <Link
                href={"/notifications"}
                className="flex items-center p-2 ml-2 bg-green-200 hover:bg-green-300 rounded-md justify-center text-xs text-gray-800 focus:outline-none "
              >
                <GrNotification className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isSidebarexpanded={isSidebarExpanded} user={session?.user} />

      <div
        className={`p-2 pb-16  ${isSidebarExpanded ? "sm:ml-48" : "sm:ml-20"}`}
      >
        <div className="px-2 mt-8 text-sm border-gray-300">{children}</div>
      </div>
    </div>
  );
}
