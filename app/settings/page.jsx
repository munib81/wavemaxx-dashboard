"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Link from "next/link";

export default function SettingsPage() {
  const { data: session } = useSession();
  // const [invites, setInvites] = useState([]);

  return (
    <div className="lg:px-12 md:px-8 px-2 bg-gray-50 min-h-screen">
      <div className="md:flex md:justify-between py-10">
        <div className="md:w-1/2 w-full">
          <h1 className="flex flex-row text-2xl font-semibold text-gray-900 dark:text-white md:text-3xl">
            Settings
          </h1>
          <p className="text-sm flex text-gray-500 dark:text-gray-400">
            Manage your account and settings here.
          </p>
        </div>
        <br />

        {/* <form className="md:w-1/3 w-full ">
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
              placeholder="press '/' to search"
              required
            />
            <button
              type="submit"
              className="text-white absolute rounded right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium text-sm px-2 py-1 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Search
            </button>
          </div>
        </form> */}
      </div>
      <div className="flex flex-col ">
        <div className="relative flex flex-col items-center rounded-[20px] w-max-content max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 !bg-navy-800 text-black !shadow-none p-5 pb-8 transition duration-200 linear">
          <div className="relative mb-3 flex items-center justify-between pt-1 w-full">
            <h4 className="text-xl font-bold text-navy-700 text-black">
              Account Details
            </h4>
            <button className="flex items-center text-xl hover:cursor-pointer bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 bg-navy-700 text-black hover:bg-white/20 active:bg-white/10 rounded-lg">
              <svg
                className="h-6 w-6"
                fill="currentColor"
                height="1em"
                stroke="currentColor"
                stroke-width="0"
                viewbox="0 0 16 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="mt-3 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox1"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox1"
              >
                Item comment notifications
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox2"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox2"
              >
                Buyer review notifications
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox3"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox3"
              >
                Rating reminders notifications
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox4"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox4"
              >
                Meetups near you notifications
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox5"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox5"
              >
                Company news notifications
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox6"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox6"
              >
                New launches and projects
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox7"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox7"
              >
                Monthly product changes
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox8"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox8"
              >
                Subscribe to newsletter
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input
                className='relative h-5 w-10 appearance-none rounded-[20px] bg-[#e0e5f2] outline-none transition duration-[0.5s] 
                    before:absolute before:top-[50%] before:h-4 before:w-4 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-[20px]
                    before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
                    checked:before:translate-x-[22px] hover:cursor-pointer checked:bg-brand-500 checked:bg-brand-400'
                id="checkbox8"
                name="weekly"
                type="checkbox"
              />
              <label
                className="text-base font-medium text-navy-700 text-black"
                for="checkbox8"
              >
                Email me when someone follows me
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
