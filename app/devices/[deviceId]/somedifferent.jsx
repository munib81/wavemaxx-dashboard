"use client";

import { Key, useEffect } from "react";
import { toast } from "react-toastify";
import { SiDevpost } from "react-icons/si";
import { HiOutlineBookmark } from "react-icons/hi";
import { FcBookmark } from "react-icons/fc";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs } from "flowbite";
import { FcCalendar } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { RxLapTimer } from "react-icons/rx";
import { HiStatusOnline } from "react-icons/hi";
import { IoMdImages } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { IoLogoOctocat } from "react-icons/io5";
import Loading from "@/components/animations/loading";
import { HiOutlineStatusOnline } from "react-icons/hi";

export default function Hackathons() {
  const { data: session } = useSession();

  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        // Fetch device data using params.deviceId
        const res = await fetch(`/api/devices/${params.deviceId}`);
        const data = await res.json();
        setDeviceData(data[0]);
        console.log("Device data:", data[0]);
      } catch (error) {
        console.error("Error fetching device data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchDeviceData();
  }, [params.deviceId]);

  if (loading) {
    return <Loading />;
  }

  useEffect(() => {
    // check if window is ready
    if (window) {
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
        // {
        //   id: "settings",
        //   triggerEl: document.querySelector("#settings-tab"),
        //   targetEl: document.querySelector("#settings"),
        // },
        // {
        //   id: "contacts",
        //   triggerEl: document.querySelector("#contacts-tab"),
        //   targetEl: document.querySelector("#contacts"),
        // },
      ];

      // options with default values
      const options = {
        defaultTabId: "dashboard",
        activeClasses:
          "text-gray-100 hover:text-gray-300 border-blue-600 dark:border-blue-500",
        inactiveClasses:
          "text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-700 dark:border-gray-700 dark:hover:text-gray-300",
        onShow: () => {
          //console.log("tab is shown");
        },
      };

      /*
       * tabElements: array of tab objects
       * options: optional
       */
      const tabs = new Tabs(tabElements, options);
      // const tabs = new Tabs(tabElements);

      // open tab item based on id
      tabs.show("profile");
    }

    const searchInput = document.getElementById("search-input");

    window.addEventListener("keydown", (event) => {
      if (event.key === "/") {
        event.preventDefault();
        searchInput.focus();
      }
    });
  }, []);

  return (
    <>
      <div className="md:px-4 px-2">
        {" "}
        <br />
        <div className="md:flex md:justify-between">
          <div className="md:w-1/2 w-full">
            <h1 className="flex flex-row text-2xl font-extrabold text-gray-50 md:text-3xl ">
              Hackathons
            </h1>
            <p className="text-sm flex  text-gray-500 dark:text-gray-400">
              Checkout our scraped list of Hackathon projects to kickstart your
              coding journey
            </p>
          </div>
          <br />

          <form className="md:w-1/3 w-full hidden">
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                tabIndex={-1}
                id="search-input"
                className="block rounded p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="press '/' to search"
                required
              />
              <button
                type="submit"
                className="text-white absolute rounded right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-7">
          <div className="card">
            <div className="mb-4 border-gray-200 dark:border-gray-700">
              <ul
                className="flex overflow-x-auto -mb-px text-sm font-medium text-center"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                <li className="mr-2" role="presentation">
                  <button
                    className="flex flex-row p-3 border-b-2 rounded-t-lg"
                    id="profile-tab"
                    data-tabs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    <SiDevpost className="text-lg mr-2 text-blue-200" />
                    Devpost
                  </button>
                </li>
                <li className="mr-2" role="presentation">
                  <button
                    className="flex flex-row p-3 border-b-2 border-transparent text-[13px] rounded-t-lg hover:text-gray-600 hover:border-gray-700 dark:hover:text-gray-300"
                    id="dashboard-tab"
                    data-tabs-target="#dashboard"
                    type="button"
                    role="tab"
                    aria-controls="dashboard"
                    aria-selected="false"
                  >
                    <IoMdImages className="text-lg mr-2 text-blue-200" />
                    Devfolio
                  </button>
                </li>
                {/* <li className="mr-2" role="presentation">
                  <button
                    className="flex flex-row p-3 border-b-2 border-transparent text-[13px] rounded-t-lg hover:text-gray-600 hover:border-gray-700 dark:hover:text-gray-300"
                    id="settings-tab"
                    data-tabs-target="#settings"
                    type="button"
                    role="tab"
                    aria-controls="settings"
                    aria-selected="false"
                  >
                    <FcGoogle className="text-lg mr-2 text-blue-200" />
                    GSOC
                  </button>
                </li>
                <li role="presentation">
                  <button
                    className="flex flex-row p-3 border-b-2 border-transparent text-[13px] rounded-t-lg hover:text-gray-600 hover:border-gray-700 dark:hover:text-gray-300"
                    id="contacts-tab"
                    data-tabs-target="#contacts"
                    type="button"
                    role="tab"
                    aria-controls="contacts"
                    aria-selected="false"
                  >
                    <IoLogoOctocat className="text-lg mr-2 text-blue-200" />
                    Hacktober
                  </button>
                </li> */}
              </ul>
            </div>
            <div id="myTabContent" className="mt-5">
              <div
                className="hidden p-4 rounded-md bg-gray-50 dark:bg-navbar"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="grid grid-flow-row-dense md:grid-cols-2 grid-cols-1 gap-3">
                  {hackathons.hackathons.map((hackathon) => {
                    return (
                      <div key={hackathon?.id}>
                        <div className=" border bg-navbarDark dark:border-gray-700 relative flex flex-row md:space-x-5 space-y-0 rounded px-2 pb-2">
                          <div className="w-1/5  grid place-items-center mt-2">
                            <img
                              src={hackathon?.thumbnail_url}
                              alt=""
                              className="rounded bg-navbar w-20 h-20 md:w-full md:h-full object-cover md:mr-0 mr-2"
                            />
                          </div>
                          <div className="w-4/5 bg-navbarDark flex flex-col space-y-2 py-3">
                            <div>
                              <div className="flex justify-between">
                                <a
                                  href={hackathon.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className=" text-gray-100 hover:underline md:text-xl text-lg"
                                >
                                  {hackathon?.title}
                                </a>

                                {/* <button onClick={() => handleBookMark(hackathon)}>
                      <HiOutlineBookmark className="text-gray-400 text-xl cursor-pointer hover:text-gray-300" />
                      </button> */}
                                <button
                                  onClick={() => handleBookMark(hackathon)}
                                >
                                  {bookMarkHackathons.some(
                                    (item) => item.id === hackathon.id
                                  ) ? (
                                    <FcBookmark className="text-gray-400 text-xl cursor-pointer hover:text-gray-300" />
                                  ) : (
                                    <HiOutlineBookmark className="text-gray-400 text-xl cursor-pointer hover:text-gray-300" />
                                  )}
                                </button>
                              </div>
                              <p className=" text-gray-400 text-sm flex">
                                {hackathon?.organization_name}
                              </p>
                            </div>
                            <div className="grid grid-flow-row-dense grid-cols-2 gap-3 py-3">
                              <div className="flex items-center">
                                <HiStatusOnline className="text-green-500 mr-1" />
                                <p className="text-gray-300 text-sm ml-1">
                                  {hackathon?.displayed_location?.location}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <FcCalendar className="" />
                                <p className="text-gray-300 text-sm ml-1">
                                  {hackathon?.submission_period_dates}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <RxLapTimer className="" />
                                <p className="text-gray-300 text-sm ml-1">
                                  {hackathon?.time_left_to_submission}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <FcMoneyTransfer className="" />
                                <p className="text-gray-300 text-sm ml-1">
                                  {hackathon?.prize_amount
                                    .replace("<span data-currency-value>", "")
                                    .replace("</span>", "")}
                                </p>
                              </div>
                            </div>
                            {/* <p className=" text-gray-300">
                        <Link href={hackathon.url} className="mr-2 w-fit p-2 my-4 text-sm font-medium text-center text-gray-900 bg-white border border-blue-300 rounded hover:bg-blue-100  dark:bg-blue-700 dark:text-white dark:border-blue-600 dark:hover:bg-blue-800 dark:hover:border-blue-800 ">Create Project</Link>
                        <a href={hackathon.url} target="_blank" rel="noreferrer" className="w-fit p-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-700 rounded hover:bg-blue-100  dark:bg-navbar dark:text-white dark:border-gray-700 dark:hover:bg-navbarDark dark:hover:border-gray-700 ">View Hackathon</a>
                      </p> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className="hidden p-4 rounded-md bg-gray-50 dark:bg-navbar"
                id="dashboard"
                role="tabpanel"
                aria-labelledby="dashboard-tab"
              >
                <div className="grid grid-flow-row-dense md:grid-cols-2 grid-cols-1 gap-3">
                  <div className="grid justify-center py-40 w-full">
                    <h1 className="font-medium text-gray-800 dark:text-white">
                      Comming Soon
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We are working on it. Stay tuned!
                    </p>
                  </div>
                </div>
              </div>
              {/* <div
                className="hidden p-4 rounded-md bg-gray-50 dark:bg-navbar"
                id="settings"
                role="tabpanel"
                aria-labelledby="settings-tab"
              >
                <h1 className="text-4xl font-bold text-gray-300 mb-4">
                  What is GSoC?
                </h1>
                GSoC (Google Summer of Code) is a global program organized by
                Google to encourage students to contribute to open-source
                software projects. Here's a complete guide on the process and
                time of participation in GSoC:
                <br />
                What is GSoC?
                <br />
                GSoC is a program that encourages college and university
                students to work on open-source software projects during their
                summer break. The program is organized by Google and offers
                students a stipend to work on open-source projects mentored by
                experienced developers.
                <br />
                <br />
                How to participate in GSoC?
                <br />
                To participate in GSoC, you need to follow these steps:
                <br />
                <br />
                a. Check the eligibility criteria: To participate in GSoC, you
                must be a college or university student who is at least 18 years
                old.
                <br />
                b. Research and choose a project: Once you have confirmed your
                eligibility, you can start researching and choosing a project to
                work on. You can find project ideas on the GSoC website, or you
                can contact organizations and mentors directly.
                <br />
                c. Reach out to the organization and mentor: Once you have
                chosen a project, you should reach out to the organization and
                mentor to introduce yourself and discuss the project in more
                detail.
                <br />
                d. Submit your application: After discussing the project with
                your mentor, you should submit your application to the GSoC
                program. Your application should include a project proposal,
                timeline, and other relevant details.
                <br />
                e. Wait for the results: After submitting your application, you
                will need to wait for the results to be announced. If you are
                selected, you will be informed via email.
                <br />
                <br />
                When does GSoC take place?
                <br />
                GSoC takes place every summer. The program starts with the
                student application period in March, followed by the mentor
                organization application period in February. The program runs
                from May to August.
                <br />
                <br />
                How long does it take to participate in GSoC?
                <br />
                Participating in GSoC is a significant commitment, and it can
                take several months to complete a project successfully. During
                the program, students are expected to work full-time on their
                projects and attend regular meetings with their mentor and
                organization.
                <br />
                <br />
                What are the benefits of participating in GSoC?
                <br />
                Participating in GSoC has several benefits, including:
                <br />
                <br />
                a. Gaining real-world experience working on open-source
                projects.
                <br />
                b. Learning new technologies and programming languages.
                <br />
                c. Building a portfolio of work that can be showcased to
                potential employers.
                <br />
                d. Networking with other developers and mentors in the industry.
                <br />
                e. Receiving a stipend to work on a project during the summer.
                <br />
                In conclusion, GSoC is an excellent opportunity for college and
                university students to gain valuable experience working on
                open-source projects and learn from experienced developers. By
                following the steps outlined above, you can participate in GSoC
                and make a meaningful contribution to the open-source community.
              </div>
              <div
                className="hidden p-4 rounded-md bg-gray-50 dark:bg-navbar"
                id="contacts"
                role="tabpanel"
                aria-labelledby="contacts-tab"
              >
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Hacktoberfest is an annual event that encourages people to
                  contribute to open-source projects. Here's a complete guide on
                  the process and time of participation in Hacktoberfest:
                  <br />
                  <br />
                  What is Hacktoberfest?
                  <br />
                  Hacktoberfest is a month-long event that takes place every
                  October. It is a global celebration of open-source software
                  where developers are encouraged to contribute to open-source
                  projects.
                  <br />
                  <br />
                  How to participate in Hacktoberfest?
                  <br />
                  To participate in Hacktoberfest, you need to follow these
                  simple steps:
                  <br />
                  <br />
                  a. Sign up on the Hacktoberfest website: The first step to
                  participating in Hacktoberfest is to sign up on the official
                  website. You can do this by visiting
                  https://hacktoberfest.digitalocean.com/ and clicking on the
                  "Start Hacking" button.
                  <br />
                  <br />
                  b. Find open-source projects to contribute to: Once you have
                  signed up, you can start looking for open-source projects to
                  contribute to. You can find projects on sites like GitHub,
                  GitLab, and Bitbucket.
                  <br />
                  <br />
                  c. Make contributions: Once you have found a project you want
                  to contribute to, you can start making contributions. You can
                  do this by submitting pull requests, fixing bugs, adding new
                  features, or improving documentation.
                  <br />
                  <br />
                  d. Complete four pull requests: To qualify for a Hacktoberfest
                  t-shirt, you need to submit four pull requests during the
                  month of October. Make sure your pull requests meet the
                  Hacktoberfest guidelines.
                  <br />
                  <br />
                  What are the Hacktoberfest guidelines?
                  <br />
                  To qualify for a Hacktoberfest t-shirt, your pull requests
                  must meet the following guidelines:
                  <br />
                  a. The pull request must be submitted to a public repository.
                  <br />
                  b. The pull request must be approved by the repository
                  maintainer or a collaborator.
                  <br />
                  c. The pull request must be merged, or it must have been
                  marked as "accepted" by the maintainer.
                  <br />
                  d. The pull request must include improvements such as bug
                  fixes, new features, or documentation updates.
                  <br />
                  When does Hacktoberfest take place?
                  <br />
                  Hacktoberfest takes place every October. The event starts on
                  October 1st and runs until October 31st.
                  <br />
                  <br />
                  How long does it take to participate in Hacktoberfest?
                  <br />
                  The time it takes to participate in Hacktoberfest depends on
                  how much time you want to commit to contributing to
                  open-source projects. Some people spend a few hours a week,
                  while others may spend several hours a day.
                  <br />
                  <br />
                  What are the benefits of participating in Hacktoberfest?
                  Participating in Hacktoberfest has several benefits,
                  including:
                  <br />
                  <br />
                  a. Gaining experience in contributing to open-source projects.
                  <br />
                  b. Learning new skills and technologies.
                  <br />
                  c. Building your portfolio and resume.
                  <br />
                  d. Meeting other developers and building your network.
                  <br />
                  e. Contributing to the open-source community and making a
                  positive impact on the world.
                  <br />
                  In conclusion, Hacktoberfest is a great opportunity to
                  contribute to open-source projects and gain valuable
                  experience as a developer. By following the steps outlined
                  above, you can participate in Hacktoberfest and make a
                  meaningful contribution to the open-source community.
                </p>
              </div> */}
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}
