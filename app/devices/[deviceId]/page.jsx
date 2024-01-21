"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/animations/loading";

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="p-1 bg-gray-200 text-xl mb-4 rounded-lg px-2 font-semibold">
        Device Settings
      </h1>
      {deviceData ? (
        <>
          <div className="rounded-lg mx-auto mb-4 w-full p-4 bg-gray-200 relative overflow-hidden">
            <div className="w-full h-full block">
              <div className="md:flex items-center md:justify-between justify-normal">
                <div className="flex">
                  <img
                    alt="User avatar"
                    className="sm:w-10 sm:h-10 h-8 w-8 object-cover bg-gray-50 p-1 rounded-full"
                    src="https://images.ctfassets.net/o7xu9whrs0u9/1mpMDYVC8k7iFgFzM99SnS/c2dfa0df9cb6d6c8643c60b0657326fe/technology-hl.svg"
                  />
                  <div className="pl-3">
                    <div className="font-medium bg-gray-500 w-fit px-1 rounded text-gray-100 sm:text-base text-sm">
                      {params.deviceId}
                    </div>
                    <div className="text-gray-600 sm:text-sm text-xs">
                      View status, location, and manage settings.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Display other device settings here using deviceData */}
        </>
      ) : (
        <p>Device not found.</p>
      )}
    </div>
  );
}
