"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/animations/loading";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { SiDevpost } from "react-icons/si";
import { IoMdImages } from "react-icons/io";
import { Slider } from "@nextui-org/react";

export default function DeviceSettings({ params }) {
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

  return (
    <div>
      <div className="rounded-lg mx-auto mb-4 w-full bg-gray-100 relative overflow-hidden">
        <div className="w-full h-full block">
          <div className="md:flex items-center md:justify-between justify-normal bg-white border p-4 rounded-lg">
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

            <div className="flex space-x-4">
              <div className="grid place-content-center items-center">
                <p className="text-gray-600 sm:text-sm  font-semibold text-xs pr-2">
                  {" "}
                  LWMS RTU :
                </p>
                <img
                  src="/marker/device.png"
                  className="w-9 h-9 mx-auto mt-1 bg-gray-200 rounded-full"
                />
              </div>
              <div className="grid place-content-center items-center">
                <p className="text-gray-600 sm:text-sm  font-semibold text-xs pr-2">
                  {" "}
                  Status :
                </p>
                <HiOutlineStatusOnline className="text-green-700 text-4xl rounded-full mx-auto mt-1 bg-green-300 p-2 " />
              </div>
              <div className="grid place-content-center items-center">
                <p className="text-gray-600 sm:text-sm  font-semibold text-xs pr-2">
                  {" "}
                  Actions :
                </p>
                <a
                  href="http://3.109.48.213/LnT2/Dashbord.html"
                  type="button"
                  className="py-2 px-3 mt-1 text-sm font-medium text-center text-white bg-gray-600 rounded hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 "
                >
                  Open settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <img
          src="/images/deviceFlow.jpg"
          className="w-[90%]  mx-auto mt-1 bg-gray-200 rounded-xl"
        />
      </div>
    </div>
  );
}
