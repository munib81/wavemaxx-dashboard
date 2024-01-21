"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ThemeLink from "./ThemeLink";
// import NextNProgress from 'nextjs-progressbar';
import { getData } from "@/libs/getData";
import { FcShop } from "react-icons/fc";

import { useSession, signOut, signIn } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";
import { FcMoneyTransfer, FcFeedback, FcSettings } from "react-icons/fc";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FcShare } from "react-icons/fc";

import { Dropdown } from "flowbite";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import CustomSessionProvider from "./SessionProvider";
import ScrollToTopButton from "@/components/ScrollToTopButton";
// import NextTopLoader from "nextjs-toploader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { VscGithubAction } from "react-icons/vsc";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineNearbyError } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar({ children }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { data: session } = useSession();

  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateToSearch();
    clearInput();
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value.trim());
  };

  const navigateToSearch = () => {
    if (searchInput) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const clearInput = () => {
    setSearchInput("");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      navigateToSearch();
    }, 500); // 500ms delay to debounce the input

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  useEffect(() => {
    const searchInput = document.getElementById("default-search");

    window.addEventListener("keydown", (event) => {
      if (event.key === "/") {
        event.preventDefault();
        searchInput.focus();
      }
      if (event.key === "Escape") {
        searchInput.blur();
      }
    });
  }, []);

  return (
    <div className=" min-h-screen">
      {/* <NextTopLoader
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
      /> */}
      <ToastContainer />
      <nav className="fixed top-0 z-50 w-full  bg-gray-50 border-b border-gray-300 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none  "
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              {/* <a href="/" className="flex ms-2 md:me-24">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5731/5731863.png"
                  className="h-8 "
                  alt="FlowBite Logo"
                />
                <span className="self-center text-base font-bold font-mono sm:text-xl whitespace-nowrap ">
                  HeyRocket!
                </span>
              </a> */}
              <Link
                href={"/"}
                className="flex items-center ms-2 md:me-24 space-x-2 lg:pr-16 pr-6"
              >
                <img src="/logo.png" alt="" className="w-10 object-contain" />
                <h2 className="font-bold text-xl  leading-6 text-gray-800">
                  WaveMaxx
                </h2>
              </Link>
            </div>

            <div className="flex items-center">
              {/* add */}
              <button className="flex items-center justify-center p-2 text-sm font-semibold text-gray-800 rounded-lg hover:bg-gray-200 bg-gray-100 border border-gray-200 mr-2 focus:outline-none  ">
                <span className="sr-only">Quick Actions</span>
                <VscGithubAction className="w-5 h-5 mr-1" />
                Quick Actions
              </button>

              <Link
                href={`/admin`}
                className="flex items-center justify-center p-2 text-sm font-semibold text-gray-800 rounded-lg hover:bg-gray-200 bg-gray-100 border border-gray-200 mr-2 focus:outline-none  "
              >
                <span className="sr-only">Admin</span>
                <MdAdminPanelSettings className="w-5 h-5 mr-1" />
                Admin
              </Link>

              {/* recharge wallet button */}
              {/* <button className="flex items-center justify-center p-2 mr-2 text-sm font-semibold text-gray-800 rounded-lg hover:bg-gray-200 bg-gray-100 border border-gray-200 focus:outline-none  ">
                <span className="sr-only">recharge wallet</span>
                <FcMoneyTransfer className="w-5 h-5 mr-1" /> $100 recharge
                wallet
              </button> */}

              <button className="flex items-center justify-center p-2 text-sm text-gray-800 rounded-lg hover:bg-gray-200 bg-gray-100 border border-gray-200 focus:outline-none  ">
                <IoNotificationsSharp className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  id="dropdownAvatarNameButton"
                  onClick={toggleDropdown}
                  data-dropdown-toggle="dropdownAvatarName"
                  className="flex ml-3 p-1  items-center text-sm font-medium  rounded-lg  hover:bg-gray-200 bg-gray-100 border border-gray-200 md:mr-0  text-black"
                  type="button"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      "https://as1.ftcdn.net/v2/jpg/03/53/11/00/500_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                    }
                    alt=""
                  />
                  <span className="mx-1 md:flex hidden ">
                    {session?.user?.name || session?.user?.login}
                  </span>
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
                      <div className="px-2 py-3 text-sm  text-black ">
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
                            <div className="font-semibold ">
                              {session?.user?.name || session?.user?.login}
                            </div>
                            <div className="truncate text-xs font-medium">
                              role: {session?.user?.role || "user"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul
                        className=" text-sm  text-gray-800"
                        data-dropdown-toggle="dropdownAvatarName"
                        aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
                      >
                        {session?.user?.role == "superadmin" && (
                          <li>
                            <a
                              href="/admin"
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
                            href={`/settings`}
                            className="flex flex-inline place-items-center px-2 py-2  hover:bg-gray-200 "
                          >
                            <span className="px-2">
                              <FaUserCircle />
                            </span>
                            Settings
                          </a>
                        </li>

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
                          className="text-sm flex flex-inline place-items-center px-2 py-2 text-gray-800 hover:bg-gray-200"
                          // onClick={() => signOut()}
                        >
                          <span className="px-2">
                            <RiLogoutBoxRFill />
                          </span>
                          Sign out
                        </a>
                      </div>
                    </div>
                    {/* <div
                    onClick={toggleDropdown}
                    className="w-full top-0 left-0 h-screen z-10 bg-gray-50 absolute"
                  ></div> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform -translate-x-full  bg-gray-50 border-r border-gray-300 sm:translate-x-0  "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto  overflow-hidden ">
          <ul className="space-y-1 font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <BiSolidDashboard className="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-gray-900 " />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/central-devices"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FaCartShopping className="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-gray-900 " />
                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  central devices
                </span>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full  ">
                Pro
              </span> */}
              </Link>
            </li>
            <li>
              <Link
                href="/remote-devices"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <TbTruckReturn className="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-gray-900 " />
                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  remote devices
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/notifications"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <MdOutlineNearbyError className="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-gray-900 " />

                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  notifications
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/charges"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  class="w-4 h-4 text-gray-700 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M19.9 6.58c0-.009 0-.019-.006-.027l-2-4A1 1 0 0 0 17 2h-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.3c-.03.165-.047.332-.051.5a3.25 3.25 0 1 0 6.5 0A3.173 3.173 0 0 0 7.7 12h4.6c-.03.165-.047.332-.051.5a3.25 3.25 0 1 0 6.5 0 3.177 3.177 0 0 0-.049-.5h.3a1 1 0 0 0 1-1V7a.99.99 0 0 0-.1-.42ZM16.382 4l1 2H13V4h3.382ZM4.5 13.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm11 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  Courier Charges
                </span>
              </Link>
            </li> */}

            <li>
              <Link
                href="/logs"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FaTools className="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-gray-900 " />
                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  logs
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/billing"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  class="w-5 h-5 text-gray-700 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  Billing
                </span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/help"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  class="w-4 h-4 text-gray-700 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  Help{" "}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <FcSettings className="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-gray-900 " />
                <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                  Settings
                </span>
              </Link>
            </li>
            {/* <li>
            <a
              href="/admin"
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap text-sm">
                Admin only
              </span>
            </a>
          </li> */}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-48">
        <div className="p-4 mt-14">{children}</div>
      </div>
    </div>
  );
}
