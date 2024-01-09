"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function CreateDevice() {
  const { data: session } = useSession();

  const [deviceId, setDeviceId] = useState(generateDeviceId());
  const [rtuId, setRtuId] = useState("");
  const [centralId, setCentralId] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  function generateDeviceId() {
    // Generate random 8-character string
    return Math.random().toString(36).substr(2, 8);
  }

  const handleRtuIdChange = (e) => setRtuId(e.target.value);
  const handleCentralIdChange = (e) => setCentralId(e.target.value);
  const handleLatChange = (e) => setLat(e.target.value);
  const handleLongChange = (e) => setLong(e.target.value);
  const handleDeviceIdChange = (e) => setDeviceId(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      submittedAt: Date.now(),
      adminUser: {
        name: session?.user?.name,
        email: session?.user?.email,
        id: session?.user?.id,
      },
      deviceId,
      rtuId,
      centralId,
      location: { lat, long },
    };
    const postURL = "/api/devices";
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      toast("🔮 Device Created", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Reset form fields if necessary
      setDeviceId(generateDeviceId()); // Regenerate a new device ID for next submission
      setRtuId("");
      setCentralId("");
      setLat("");
      setLong("");
    });
  };

  return (
    <section className="md:px-8 px-2 bg-gray-50 min-h-screen h-full">
      <div className="py-8 lg:py-10 md:px-4 px-2 p-2 rounded-2xl mx-auto  max-w-4xl ">
        <h2 className="text-2xl font-bold  text-gray-800">Create Device</h2>
        <p className="mb-8 lg:mb-8  text-gray-600 text-sm ">
          Create a new device and register it with the system.
        </p>
        <form method="POST" className="md:space-y-8 space-y-4">
          <div>
            <label
              htmlFor="deviceId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Generated Device ID{" "}
              <span className="text-gray-500">(editable)</span>
            </label>
            <input
              type="text"
              id="deviceId"
              value={deviceId}
              onChange={handleDeviceIdChange}
              className="block p-3 w-full text-sm bg-gray-200 rounded border focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rtuId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              RTU ID
            </label>
            <input
              type="text"
              id="rtuId"
              className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
              onChange={handleRtuIdChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="centralId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Central ID
            </label>
            <input
              type="text"
              id="centralId"
              className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
              onChange={handleCentralIdChange}
              required
            />
          </div>
          <div>
            <h1 className="block mb-2 text-sm font-medium text-gray-900">
              Add Location
            </h1>
            <div className="w-full gap-4 flex justify-between">
              <div className="w-full">
                <label
                  htmlFor="lat"
                  className="block mb-2 text-xs font-medium text-gray-900"
                >
                  Latitude
                </label>
                <input
                  type="text"
                  id="lat"
                  onChange={handleLatChange}
                  className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="long"
                  className="block mb-2 text-xs font-medium text-gray-900"
                >
                  Longitude
                </label>
                <input
                  type="text"
                  id="long"
                  className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
                  onChange={handleLongChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex mt-2">
            <button
              onClick={handleSubmit}
              className="py-3 px-5 text-sm font-medium text-center text-white rounded bg-indigo-600 sm:w-fit hover:bg-indigo-700 bg-primary-600 hover:bg-primary-700 "
            >
              Create Device
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
