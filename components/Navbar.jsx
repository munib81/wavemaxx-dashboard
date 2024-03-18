"use client";

import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { VscGithubAction } from "react-icons/vsc";
import { FcMoneyTransfer, FcFeedback } from "react-icons/fc";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FcShare } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineNearbyError } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import Sidebar from "@/components/sidebar";
import { GiWeight } from "react-icons/gi";
import { MdOutlineAddChart } from "react-icons/md";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useSession } from "next-auth/react";
import { CgLogIn } from "react-icons/cg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Navbar({ children }) {
  ///const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log("Authentication State:", isAuthenticated, user);

  const { data: session } = useSession();

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
      <NextTopLoader
        color="#7F00FF"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        template='<div className="bar" role="bar"><div className="peg"></div></div>
          <div className="spinner" role="spinner"><div className="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <ToastContainer />

      <nav className="sticky md:top-3 top-0 md:w-[94%] w-full bg-white md:shadow md:rounded md:left-20 z-30 ">
        <div className="px-2 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="flex items-center justify-center text-sm  text-gray-800   mr-2 focus:outline-none  ">
                {/* <VscGithubAction className="w-5 h-5 mr-1" /> */}
                Welcome back, {session?.user?.name}!
              </div>
            </div>
            <div className="flex items-center">
              {/* <div className="border-r-2 flex border-gray-300 pr-2 ">
                <h1 className="flex items-center justify-center p-1 mr-2 text-sm text-black rounded bg-gray-100 border border-gray-200 focus:outline-none  ">
                  ₹ 5,990 <FcMoneyTransfer className="w-4 h-4 ml-1" />
                </h1>
                <button className="flex items-center justify-center py-2 p-2 mr-2 text-xs  rounded bg-indigo-700 text-white focus:outline-none hover:bg-indigo-800  ">
                  <span className="sr-only">recharge wallet</span>
                  recharge wallet
                </button>
              </div> */}
              {session ? (
                <div className="border-r-2 flex border-gray-300 px-2 ">
                  <Link
                    href={"/admin"}
                    className="flex items-center justify-center p-1 text-xs text-gray-100 hover:bg-indigo-900 bg-indigo-800 hover:text-white py-1.5 h-full rounded px-2 focus:outline-none  "
                  >
                    <VscGithubAction className="w-5 h-5 mr-1" />
                    Super Admin
                  </Link>
                </div>
              ) : (
                <div className="border-r-2 flex border-gray-300 px-2 ">
                  <Link
                    href={"/login"}
                    className="flex items-center justify-center p-1 text-xs text-gray-100 hover:bg-indigo-900 bg-indigo-800 hover:text-white py-1.5 h-full rounded px-2 focus:outline-none  "
                  >
                    <CgLogIn className="w-5 h-5 mr-1" />
                    Login
                  </Link>
                </div>
              )}

              <button className="flex items-center px-2 justify-center text-xs text-gray-800 focus:outline-none ">
                <IoNotificationsSharp className="w-5 h-5" />
              </button>

              {/* <div className="relative">
                <button
                  id="dropdownAvatarNameButton"
                  onClick={toggleDropdown}
                  data-dropdown-toggle="dropdownAvatarName"
                  className="flex ml-3 p-1  items-center text-xs font-medium  rounded-lg  hover:bg-gray-200 bg-white border border-gray-200 md:mr-0  text-black"
                  type="button"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      session?.user?.picture ||
                      "https://as1.ftcdn.net/v2/jpg/03/53/11/00/500_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                    }
                    alt=""
                  />
                  <span className="md:flex hidden ml-1">Ayush</span>
                  <svg
                    className="w-4 h-4 mr-1 "
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {isDropdownOpen && (
                  <>
                    <div
                      id="dropdownAvatarName"
                      className="z-30 absolute right-0 top-12 bg-gray-100 border border-gray-300 divide-y  rounded-lg shadow w-48 bg-navbar divide-gray-300"
                    >
                      <div className="px-2 py-3 text-xs  text-black ">
                        <div className="flex items-center">
                          <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={
                              "" ||
                              "https://as1.ftcdn.net/v2/jpg/03/53/11/00/500_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                            }
                            alt=""
                          />
                          <div className="ml-2">
                            <div className="font-semibold ">ayush</div>
                            <div className="truncate text-xs font-medium">
                              ayush.mail@gmail.com
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul
                        className=" text-xs  text-gray-800"
                        data-dropdown-toggle="dropdownAvatarName"
                        aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                      >
                        <li>
                          <a
                            href={`/settings`}
                            className="flex flex-inline place-items-center px-2 py-2  hover:bg-gray-200 "
                          >
                            <span className="px-2">
                              <FaUserCircle />
                            </span>
                            Settings
                          </a>
                        </li>
                        {false == "admin" && (
                          <li>
                            <a
                              href="/pricing"
                              className="flex flex-inline place-items-center px-2 py-2  hover:bg-gray-200 "
                            >
                              <span className="px-2">
                                <FcMoneyTransfer />
                              </span>
                              Admin Panel
                            </a>
                          </li>
                        )}

                        <li>
                          <a
                            href="/feedback"
                            className="flex flex-inline place-items-center px-2 py-2  hover:bg-gray-200 "
                          >
                            <span className="px-2">
                              <FcFeedback />
                            </span>
                            FeedBack
                          </a>
                        </li>
                      </ul>
                      <div className="py-1">
                        <a
                          href="/"    
                          className="text-xs flex flex-inline place-items-center px-2 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          <span className="px-2">
                            <RiLogoutBoxRFill />
                          </span>
                          Sign out
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </nav>

      <Sidebar isSidebarexpanded={isSidebarExpanded} user={session?.user} />

      <div
        className={`p-2 pb-16  ${isSidebarExpanded ? "sm:ml-48" : "sm:ml-20"}`}
      >
        <div className="mt-4 text-sm border-gray-300">{children}</div>
      </div>
    </div>
  );
}
