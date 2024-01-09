"use client";

import { Tabs } from "flowbite";
import { useEffect } from "react";
import { TabsOptions, TabsInterface, TabItem } from "flowbite";

import { useSession } from "next-auth/react";

import { MdNotificationsActive } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { FcSettings } from "react-icons/fc";
import { FcClapperboard } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";

import General from "@/components/settings/general";
import Earnings from "@/components/settings/earnings";
import Notifications from "@/components/settings/notifications";
import Subscription from "@/components/settings/subscription";
import DeleteAccount from "@/components/settings/deleteAccount";

export default function Settings() {
  const { data: session } = useSession();
  //console.log(session);

  useEffect(() => {
    const tabElements = [
      {
        id: "profile",
        triggerEl: document.querySelector("#profile-tab"),
        targetEl: document.querySelector("#profile"),
      },
      {
        id: "dashboard",
        triggerEl: document.querySelector("#dashboard-tab"),
        targetEl: document.querySelector("#dashboard"),
      },
      {
        id: "subscription",
        triggerEl: document.querySelector("#subscription-tab"),
        targetEl: document.querySelector("#subscription"),
      },
      // {
      //   id: "appearance",
      //   triggerEl: document.querySelector("#appearance-tab"),
      //   targetEl: document.querySelector("#appearance"),
      // },
      // {
      //   id: "settings",
      //   triggerEl: document.querySelector("#settings-tab"),
      //   targetEl: document.querySelector("#settings"),
      // },
      {
        id: "contacts",
        triggerEl: document.querySelector("#contacts-tab"),
        targetEl: document.querySelector("#contacts"),
      },
    ];

    // options with default values
    const options = {
      defaultTabId: "settings",
      activeClasses:
        "text-blue-600 bg-gray-800 hover:text-blue-600 rounded dark:text-gray-100 dark:hover:text-gray-200 border-blue-600 dark:border-blue-700",
      inactiveClasses:
        "text-gray-500 rounded hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
      onShow: () => {
        //console.log("tab is shown");
      },
    };

    /*
     * tabElements: array of tab objects
     * options: optional
     */
    // const tabs = new Tabs(tabElements, options);
    const tabs = new Tabs(tabElements);

    // open tab item based on id
    tabs.show("profile");
  }, []);

  {
    /* <div className="flex flex-col ">
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
      </div> */
  }
  return (
    <>
      <br />
      <div className="w-full md:px-4 px-2">
        <div className="">
          <div className="">
            <div className="md:grid md:grid-cols-8">
              <div className="card">
                <div className="mb-4 border-gray-200 dark:border-gray-700">
                  <ul
                    className="mr-2 flex flex-auto md:grid overflow-x-auto md:overflow-hidden scrollbar-hide  text-sm font-medium text-center"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                  >
                    <li className="mr-2 w-full mb-2" role="presentation">
                      <button
                        className="flex flex-row p-3 rounded border-l-2 w-full"
                        id="profile-tab"
                        data-tabs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        <FcSettings className="text-xl md:mr-2" />
                        <span className="">General</span>
                      </button>
                    </li>
                    <li className="mr-2 w-full mb-2" role="presentation">
                      <button
                        className="flex flex-row p-3 rounded border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 w-full"
                        id="dashboard-tab"
                        data-tabs-target="#dashboard"
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected="false"
                      >
                        <FcMoneyTransfer className="text-xl md:mr-2" />
                        <span className="">Earnings</span>
                      </button>
                    </li>
                    <li className="mr-2 w-full mb-2" role="presentation">
                      <button
                        className="flex flex-row p-3 rounded border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 w-full"
                        id="subscription-tab"
                        data-tabs-target="#subscription"
                        type="button"
                        role="tab"
                        aria-controls="subscription"
                        aria-selected="false"
                      >
                        <FcPlanner className="text-xl md:mr-2" />
                        <span className="">Subscription</span>
                      </button>
                    </li>
                    {/* <li className="mr-2 w-full mb-2" role="presentation">
                            <button
                              className="flex flex-row p-3 rounded border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 w-full"
                              id="appearance-tab"
                              data-tabs-target="#appearance"
                              type="button"
                              role="tab"
                              aria-controls="appearance"
                              aria-selected="false"
                            >
                              <FcClapperboard className="text-xl md:mr-2"/>
                              <span className="">Appearance</span>
                              
                            </button>
                          </li> */}
                    {/* <li className="mr-2 w-full mb-2" role="presentation">
                            <button
                              className="flex flex-row p-3 rounded border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 w-full"
                              id="settings-tab"
                              data-tabs-target="#settings"
                              type="button"
                              role="tab"
                              aria-controls="settings"
                              aria-selected="false"
                            >
                              <MdNotificationsActive className="text-xl md:mr-2"/>
                              <span className="">Notifications</span>
                              
                            </button>
                          </li> */}
                    <li className="mr-2 w-full mb-2" role="presentation">
                      <button
                        className="flex flex-row p-3 rounded border-l-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 w-full"
                        id="contacts-tab"
                        data-tabs-target="#contacts"
                        type="button"
                        role="tab"
                        aria-controls="contacts"
                        aria-selected="false"
                      >
                        <IoTrashBin className="text-xl md:mr-2" />
                        <span className="">DeleteAccount</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:col-span-7 md:mr-4">
                <div className="card">
                  <div id="myTabContent" className="mb-4">
                    <div
                      className="hidden p-3 rounded md:mb-8 mb-4 bg-gray-50 dark:bg-navbar"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <General userDetails={session?.user} />
                    </div>
                    <div
                      className="hidden p-3 rounded md:mb-8 mb-4 bg-gray-50 dark:bg-navbar"
                      id="dashboard"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab"
                    >
                      <Earnings userDetails={session?.user} />
                    </div>
                    <div
                      className="hidden p-3 rounded md:mb-8 mb-4 bg-gray-50 dark:bg-navbar"
                      id="subscription"
                      role="tabpanel"
                      aria-labelledby="subscription-tab"
                    >
                      <Subscription userDetails={session?.user} />
                    </div>
                    {/* <div
                          className="hidden p-3 rounded md:mb-8 mb-4 bg-gray-50 dark:bg-navbar"
                          id="appearance"
                          role="tabpanel"
                          aria-labelledby="appearance-tab"
                        >
                          <Appearance userDetails={session?.user} />
                        </div> */}
                    {/* <div
                          className="hidden p-3 rounded md:mb-8 mb-4 bg-gray-50 dark:bg-navbar"
                          id="settings"
                          role="tabpanel"
                          aria-labelledby="settings-tab"
                        >
                          <Notifications userDetails={session?.user} />
                        </div> */}
                    <div
                      className="hidden p-3 rounded md:mb-8 mb-4 bg-gray-50 dark:bg-navbar"
                      id="contacts"
                      role="tabpanel"
                      aria-labelledby="contacts-tab"
                    >
                      <DeleteAccount userDetails={session?.user} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
