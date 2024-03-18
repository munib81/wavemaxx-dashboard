// Sidebar.js

import { useContext, createContext, useState } from "react";
import Link from "next/link";
import { IoSettings, IoNotificationsSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { VscGithubAction } from "react-icons/vsc";
import { FcMoneyTransfer, FcFeedback } from "react-icons/fc";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FcShare } from "react-icons/fc";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineNearbyError } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { FaCalculator } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { HiMenuAlt2 } from "react-icons/hi";
import { signOut } from "next-auth/react";

const SidebarContext = createContext();

export default function Sidebar({ isSidebarExpanded, user }) {
  const [expanded, setExpanded] = useState(false);
  const [toolsMenuExpanded, setToolsMenuExpanded] = useState(false);
  const { data: session, logout } = useSession();

  console.log(user);

  //const { logout } = useAuth0();
  // const logout = () => {
  //   console.log("logout");
  // };
  const location = usePathname();

  const isActive = (currentPath, path) => {
    if (
      currentPath === "/settings/profile" ||
      currentPath === "/settings/company" ||
      currentPath === "/settings/warehouse" ||
      currentPath === "/settings/channels" ||
      currentPath === "/settings/invoice" ||
      currentPath === "/settings/courier" ||
      currentPath === "/settings/label"
    ) {
      currentPath = "/settings";
    } else if (
      currentPath === "/orders" ||
      currentPath === "/orders/neworder"
    ) {
      currentPath = "/orders";
    }
    return currentPath === path;
  };

  const clearExpanded = () => {
    setExpanded(false);
    setToolsMenuExpanded(false);
  };

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="h-screen fixed top-0 left-0 z-30 border-r border-indigo-800"
    >
      <nav className="h-full inline-flex flex-col bg-indigo-950 border-r border-indigo-800 shadow-sm">
        <div className="p-4 pb-4 flex justify-between items-center">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all duration-200 ${
              expanded ? "w-28" : "w-0"
            }`}
            alt=""
          /> */}
          <h1
            className={`overflow-hidden whitespace-nowrap text-white transition-all duration-200 ${
              expanded ? "w-28" : "w-0"
            }`}
          >
            WaveMaxx
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1 rounded bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <HiMenuAlt2 className="w-5 h-5 text-gray-900" />
            ) : (
              <HiMenuAlt2 className="w-5 h-5 text-gray-900" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-2">
            <Link
              href="/"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-300 group
                ${
                  isActive(location, "/")
                    ? " bg-indigo-900 text-indigo-100"
                    : "hover:bg-indigo-900 text-gray-100"
                }
            `}
            >
              <BiSolidDashboard className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Dashboard
              </span>
            </Link>

            <Link
              href="/central-devices"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/central-devices")
                    ? " bg-indigo-900 text-indigo-100"
                    : "hover:bg-indigo-900 text-gray-100"
                }
            `}
            >
              <FaShoppingCart className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Central Devices
              </span>
            </Link>

            <Link
              href="/remote-devices"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/returns")
                    ? " bg-indigo-900 text-indigo-100"
                    : "hover:bg-indigo-900 text-gray-100"
                }
            `}
            >
              <TbTruckReturn className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Remote Devices
              </span>
            </Link>

            <Link
              href="/notifications"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/weight")
                    ? " bg-indigo-900 text-indigo-100"
                    : "hover:bg-indigo-900 text-gray-100"
                }
            `}
            >
              <GiWeight className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Notifications
              </span>
            </Link>

            {/* <Link
              href="/charges"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/charges")
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-100"
                }
            `}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M19.9 6.58c0-.009 0-.019-.006-.027l-2-4A1 1 0 0 0 17 2h-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.3c-.03.165-.047.332-.051.5a3.25 3.25 0 1 0 6.5 0A3.173 3.173 0 0 0 7.7 12h4.6c-.03.165-.047.332-.051.5a3.25 3.25 0 1 0 6.5 0 3.177 3.177 0 0 0-.049-.5h.3a1 1 0 0 0 1-1V7a.99.99 0 0 0-.1-.42ZM16.382 4l1 2H13V4h3.382ZM4.5 13.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm11 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
              </svg>
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Courier Charges
              </span>
            </Link> */}

            {/* Collapsible Sub-menu for Tools */}

            <Link
              href="/system-logs"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/billing")
                    ? " bg-indigo-900 text-indigo-100"
                    : "hover:bg-indigo-900 text-gray-100"
                }
            `}
            >
              {/* Your custom SVG for Billing */}
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"
                />
              </svg>
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                System Logs
              </span>
            </Link>

            <hr className="border-t-2 border-indigo-900" />

            <Link
              href="/help"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/help")
                    ? " bg-indigo-900 text-indigo-100"
                    : "hover:bg-indigo-900 text-gray-100"
                }
            `}
            >
              {/* Your custom SVG for Help */}
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
              </svg>
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Help & Support
              </span>
            </Link>

            <Link
              href="/settings"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/settings")
                    ? " bg-indigo-900 text-indigo-100"
                    : "hover:bg-indigo-900 text-gray-100"
                }
            `}
            >
              <IoSettings className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Settings
              </span>
            </Link>

            {/* <Link
              href="/feedback"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                ${
                  isActive(location, "/feedback")
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-100"
                }
            `}
            >
              <FcFeedback className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Feedback
              </span>
            </Link> */}

            {/* <hr className="my-2" /> */}

            {/* <Link
              href="/logout"
              className={`
                relative flex items-center py-2 px-2 my-1
                font-medium rounded cursor-pointer
                transition-colors duration-200 group
                hover:bg-indigo-50 text-gray-100
            `}
              onClick={() => {
                // Your logout logic here
                // Example using react-toastify:
                toast.success("Logged out successfully");
              }}
            >
              <RiLogoutBoxRFill className="w-5 h-5" />
              <span
                className={`overflow-hidden whitespace-nowrap text-xs transition-all duration-200 ${
                  expanded ? "w-40 ml-3" : "w-0"
                }`}
              >
                Logout
              </span>
            </Link> */}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t border-indigo-900 flex p-3">
          <img
            // onClick={() => setExpanded((curr) => !curr)}
            src={
              session?.user?.picture ||
              "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706745600&semt=ais"
            }
            alt=""
            className={`
              w-8 h-8 rounded ${expanded ? "ml-0" : "ml-2"}
              
            `}
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all duration-200 ${
                expanded ? "w-40 ml-2" : "w-0"
              }
          `}
          >
            <div className="leading-4">
              <h1 className="font-bold text-white whitespace-nowrap text-xs ">
                {session?.user?.name}
              </h1>
              <p
                className="text-[10px]
               text-gray-300  whitespace-nowrap "
              >
                {session?.user?.role}
              </p>
            </div>
            <IoLogOut
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                })
              }
              className="cursor-pointer text-2xl text-gray-400 hover:text-gray-100"
            />
          </div>
        </div>
      </nav>
    </aside>
  );
}
