"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/animations/loading";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { SiDevpost } from "react-icons/si";
import { IoMdImages } from "react-icons/io";

const deviceDetailsFields = [
  {
    label: "Main Valve 1",
    type: "text",
    placeholder: "Enter a name for the device",
    key: "deviceName",
  },
  {
    label: "Main Valve 2",
    type: "text",
    placeholder: "Enter the status of the device",
    key: "deviceStatus",
  },
  {
    label: "Inlet Pressure (psi)",
    type: "text",
    placeholder: "Enter the location of the device",
    key: "location",
  },
  {
    label: "Outlet Pressure (psi)",
    type: "text",
    placeholder: "Enter the type of device",
    key: "deviceType",
  },
  {
    label: "Valve 1 Pressure (psi)",
    type: "text",
    placeholder: "Enter the ID of the device",
    key: "deviceId",
  },
  {
    label: "Valve 2 Pressure (psi)",
    type: "text",
    placeholder: "Enter the IP of the device",
    key: "deviceIp",
  },
  {
    label: "Valve 3 Pressure (psi)",
    type: "text",
    placeholder: "Enter the MAC of the device",
    key: "deviceMac",
  },
  {
    label: "Valve 4 Pressure (psi)",
    type: "text",
    placeholder: "Enter the MAC of the device",
    key: "deviceMac",
  },
  {
    label: "Valve 5 Pressure (psi)",
    type: "text",
    placeholder: "Enter the MAC of the device",
    key: "deviceMac",
  },
  {
    label: "Valve 6 Pressure (psi)",
    type: "text",
    placeholder: "Enter the MAC of the device",
    key: "deviceMac",
  },
  {
    label: "Valve 7 Pressure (psi)",
    type: "text",
    placeholder: "Enter the MAC of the device",
    key: "deviceMac",
  },
  {
    label: "Valve 8 Pressure (psi)",
    type: "text",
    placeholder: "Enter the MAC of the device",
    key: "deviceMac",
  },
];

const deviceSettingFields = [
  {
    label: "Flow Control (lps)",
    type: "text",
    placeholder: "Enter a name for the device",
    key: "deviceName",
  },
  {
    label: "Minimum Inlet Pressure (psi)",
    type: "text",
    placeholder: "Enter the location of the device",
    key: "location",
  },
  {
    label: "Set Pressure Reducing)",
    type: "text",
    placeholder: "Enter the type of device",
    key: "deviceType",
  },
  {
    label: "Set Sustaining Reducing",
    type: "text",
    placeholder: "Enter the status of the device",
    key: "deviceStatus",
  },
  {
    label: "Start Sequence Time",
    type: "text",
    placeholder: "Enter the ID of the device",
    key: "deviceId",
  },
  {
    label: "Sequence Interval Time",
    type: "text",
    placeholder: "Enter the IP of the device",
    key: "deviceIp",
  },
  {
    label: "Select Operation Mode",
    type: "text",
    placeholder: "Enter the MAC of the device",
    key: "deviceMac",
  },
];

export default function DeviceSettings({ params }) {
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new-order");

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

  const deviceDetails = () => {
    return (
      <>
        <p className="bg-gray-200 mb-4 rounded-lg p-4 text-sm">
          Device Details and Status Information (Read Only)
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* component cards here */}
          {deviceDetailsFields.map((field) => (
            <div key={field.key}>
              <div className="col-span-1 bg-gray-100 p-4 flex justify-between rounded-lg">
                <h1 className="text-sm">{field.label}</h1>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    value=""
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Toggle me
                    </span> */}
                </label>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const deviceSettings = () => {
    return (
      <>
        <p className="bg-gray-200 mb-4 rounded-lg p-4 text-sm">
          Device Details and Status Information (Read Only)
        </p>
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {deviceEditFields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.key}
                  id={field.key}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder={field.placeholder}
                  defaultValue={deviceData[field.key]}
                  disabled
                />
              </div>
            ))}
          </div> */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* component cards here */}
          {deviceSettingFields.map((field) => (
            <div key={field.key} className="bg-gray-100 p-4 ">
              <div className="col-span-1 flex justify-between rounded-lg">
                <h1 className="text-sm">{field.label}</h1>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    value=""
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Toggle me
                    </span> */}
                </label>
              </div>

              <div class="relative mb-6">
                <label for="labels-range-input" class="sr-only">
                  Labels range
                </label>
                <input
                  id="labels-range-input"
                  type="range"
                  value="1000"
                  min="100"
                  max="1500"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                  Min (100)
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  500
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                  1000
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                  Max (1500)
                </span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="rounded-lg mx-auto mb-4 w-full p-4 bg-gray-100 relative overflow-hidden">
        <div className="w-full h-full block">
          <div className="md:flex items-center md:justify-between justify-normal">
            <div className="flex">
              <img
                alt="User avatar"
                className="sm:w-10 sm:h-10 h-8 w-8 object-cover bg-gray-50 p-1 rounded-full border border-gray-500"
                src="https://images.ctfassets.net/o7xu9whrs0u9/1mpMDYVC8k7iFgFzM99SnS/c2dfa0df9cb6d6c8643c60b0657326fe/technology-hl.svg"
              />
              <div className="pl-3">
                <div className="font-medium bg-gray-600 w-fit px-1 rounded text-gray-100 sm:text-base text-sm">
                  {params?.deviceId}
                </div>
                <div className="text-gray-600 sm:text-sm text-xs">
                  View status, location, and manage settings.
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 sm:text-sm  font-semibold text-xs pr-2">
                {" "}
                Status :
              </p>
              <HiOutlineStatusOnline className="text-green-700 text-4xl rounded-full bg-green-300 p-2 " />
            </div>
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap text-xs font-medium text-center text-gray-500 border-b-2 border-gray-200  ">
        <li
          onClick={() => setActiveTab("new-order")}
          className={`flex p-2 cursor-pointer text-sm rounded-t-md tracking-tight ${
            activeTab === "new-order"
              ? "border-b-2 border-solid border-indigo-700  text-gray-900"
              : "hover:text-gray-700 "
          }`}
        >
          <SiDevpost className="text-lg mr-2 text-blue-800" />
          Device
        </li>
        <li
          className={`flex p-2 cursor-pointer text-sm rounded-t-md ${
            activeTab === "ready-to-ship"
              ? "border-b-2 border-solid border-indigo-700 text-gray-900"
              : "hover:text-gray-600 "
          }`}
          onClick={() => setActiveTab("ready-to-ship")}
        >
          <IoMdImages className="text-lg mr-2 text-blue-800" />
          Settings
        </li>
      </ul>

      {/* Tab content */}
      <div className="mt-3">
        {activeTab === "new-order" && deviceDetails()}
        {activeTab === "ready-to-ship" && deviceSettings()}
      </div>
    </div>
  );
}
