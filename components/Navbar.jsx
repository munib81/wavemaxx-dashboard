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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomSessionProvider from "./SessionProvider";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Navbar({ children }) {
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
    if (session) {
      // set the dropdown menu element
      const $targetEl = document.getElementById("dropdownAvatarName");

      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById("dropdownAvatarNameButton");

      // options with default values
      const options = {
        placement: "bottom",
        triggerType: "click",
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
          ////console.log("dropdown has been hidden");
        },
        onShow: () => {
          ////console.log("dropdown has been shown");
        },
        onToggle: () => {
          ////console.log("dropdown has been toggled");
        },
      };

      const dropdown = new Dropdown($targetEl, $triggerEl, options);
    }
  }, [session]);

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
    <div>
      {/* <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} /> */}
      <ToastContainer />
      {/* <ScrollToTopButton /> */}
      <div className=" w-full">
        <div className="bg-gray-100 rounded w-full py-4 px-7 sticky shadow top-0 z-50">
          <nav className="flex justify-between">
            <Link
              href={"/"}
              className="flex items-center space-x-3 lg:pr-16 pr-6"
            >
              <img src="/logo.png" alt="" className="w-10 object-contain" />
              <h2 className="font-semibold text-xl  leading-6 text-gray-800">
                WaveMaxx
              </h2>
            </Link>
            <div className="hidden md:flex flex-auto space-x-2">
              <Link
                href={"/"}
                className="  text-white bg-indigo-600 border border-gray-200 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3  rounded"
              >
                Dashboard
              </Link>
              <Link
                href={"/central-devices"}
                className="  text-gray-600 hover:bg-indigo-600 border border-gray-200 bg-gray-50 hover:text-white cursor-pointer px-3 py-2.5 font-normal text-xs leading-3  rounded"
              >
                Central Devices
              </Link>
              <Link
                href={"/remote-devices"}
                className="  text-gray-600 hover:bg-indigo-600 border border-gray-200  bg-gray-50 hover:text-white cursor-pointer px-3 py-2.5 font-normal text-xs leading-3  rounded"
              >
                Remote Devices
              </Link>
              <Link
                href={"/notifications"}
                className="  text-gray-600  hover:bg-indigo-600 border border-gray-200  bg-gray-50 hover:text-white cursor-pointer px-3 py-2.5 font-normal text-xs leading-3  rounded"
                onclick="selected()"
              >
                Notifications
              </Link>
              <Link
                href={"/logs"}
                className="  text-gray-600  hover:bg-indigo-600 border border-gray-200 bg-gray-50 hover:text-white cursor-pointer px-3 py-2.5 font-normal text-xs leading-3  rounded"
              >
                Logs
              </Link>
              <Link
                href={"/settings"}
                className="  text-gray-600  hover:bg-indigo-600 border border-gray-200 bg-gray-50 hover:text-white cursor-pointer px-3 py-2.5 font-normal text-xs leading-3  rounded"
              >
                Settings
              </Link>
            </div>
            <div className=" flex space-x-5 justify-center items-center pl-2">
              <div className="relative cursor-pointer   ">
                <svg
                  fill="none"
                  height="24"
                  viewbox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                    stroke="#1F2937"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                </svg>
                <div className="animate-ping w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto duration-200"></div>
                <div className=" w-1.5 h-1.5 bg-indigo-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg"></div>
              </div>
              <svg
                className="cursor-pointer    "
                fill="none"
                height="24"
                viewbox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="#1F2937"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                ></path>
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="#1F2937"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                ></path>
              </svg>
              {session?.user ? (
                <>
                  <button
                    id="dropdownAvatarNameButton"
                    data-dropdown-toggle="dropdownAvatarName"
                    className="flex py-1  items-center text-sm font-medium  rounded  hover:bg-gray-200 text-gray-800"
                    type="button"
                  >
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={
                        session?.user?.image ||
                        "https://as1.ftcdn.net/v2/jpg/03/53/11/00/500_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                      }
                      alt=""
                    />
                    {/* <span className="md:flex hidden">{session?.user?.name}</span> */}
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
                  <div
                    id="dropdownAvatarName"
                    className="z-30 hidden right-10 bg-gray-100 border border-gray-200 divide-y  rounded shadow w-48 bg-navbar divide-gray-300"
                  >
                    <div className="px-2 py-3 text-sm  text-gray-900 ">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          src={
                            session?.user?.image ||
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
                      {session?.user?.role !== "superadmin" && (
                        <li>
                          <Link
                            href="/admin"
                            className="flex flex-inline place-items-center px-2 py-2  hover:bg-gray-200 "
                          >
                            <span className="px-2">
                              <FcShop className="text-lg" />
                            </span>
                            Admin
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          href={`/settings`}
                          className="flex flex-inline place-items-center px-2 py-2  hover:bg-gray-200 "
                        >
                          <span className="px-2">
                            <FaUserCircle />
                          </span>
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/feedback"
                          className="flex flex-inline place-items-center px-2 py-2  hover:bg-gray-200 "
                        >
                          <span className="px-2">
                            <FcFeedback />
                          </span>
                          Report Bug
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <Link
                        href="/"
                        className="text-sm flex flex-inline place-items-center px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-white"
                        onClick={() => signOut()}
                      >
                        <span className="px-2">
                          <RiLogoutBoxRFill />
                        </span>
                        Sign out
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={"/login"}
                  className="inline-flex items-center justify-center my-auto p-0.5 overflow-hidden text-sm font-medium rounded group bg-gray-200 hover:bg-gray-300 mr-2 px-2 "
                >
                  <span className="md:p-2 p-2 transition-all ease-in duration-75 rounded-md">
                    Login
                  </span>
                </Link>
              )}
            </div>
          </nav>
          <div className="block md:hidden w-full mt-5 ">
            <div
              className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full"
              onclick="selectNew()"
            >
              <div className="flex space-x-2">
                <span
                  className="font-semibold text-sm leading-3 hidden"
                  id="s1"
                >
                  Selected:
                </span>
                <p
                  className="font-normal text-sm leading-3  hover:bg-gray-400 duration-100 cursor-pointer "
                  id="textClicked"
                >
                  Central Devices
                </p>
              </div>
              <svg
                className=" transform"
                fill="none"
                height="24"
                id="ArrowSVG"
                viewbox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                ></path>
              </svg>
            </div>
            <div className=" relative">
              <ul
                className=" hidden font-normal text-base leading-4 absolute top-2  w-full rounded "
                id="list"
              >
                <li
                  className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50  focus:bg-gray-50 hover:bg-gray-50 duration-100 cursor-pointer text-xs leading-3 font-normal"
                  onclick="selectedSmall()"
                >
                  Remote Devices
                </li>
                <li
                  className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50  focus:bg-gray-50 hover:bg-gray-50 duration-100 cursor-pointer text-xs leading-3 font-normal"
                  onclick="selectedSmall()"
                >
                  Notifications
                </li>
                <li
                  className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50  focus:bg-gray-50 hover:bg-gray-50 duration-100 cursor-pointer text-xs leading-3 font-normal"
                  onclick="selectedSmall()"
                >
                  Logs
                </li>
                <li
                  className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50  focus:bg-gray-50 hover:bg-gray-50 duration-100 cursor-pointer text-xs leading-3 font-normal"
                  onclick="selectedSmall()"
                >
                  Settings
                </li>
                {/* <li
                  className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50  focus:bg-gray-50 hover:bg-gray-50 duration-100 cursor-pointer text-xs leading-3 font-normal"
                  onclick="selectedSmall()"
                >
                  Cards
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
