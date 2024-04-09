"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

export default function CreateDevice() {
  const { data: session } = useSession();

  const router = useRouter();

  const [deviceId, setDeviceId] = useState(generateDeviceId());
  const [rtuId, setRtuId] = useState("");
  const [GatewayId, setGatewayId] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [deviceType, setDeviceType] = useState("Gateway Device");

  function generateDeviceId() {
    // Generate random 8-character string
    return Math.random().toString(36).substr(2, 8);
  }

  const handleRtuIdChange = (e) => setRtuId(e.target.value);
  const handleGatewayIdChange = (e) => setGatewayId(e.target.value);
  const handleLatChange = (e) => setLat(e.target.value.trim());
  const handleLngChange = (e) => setLng(e.target.value.trim());
  const handleDeviceIdChange = (e) => setDeviceId(e.target.value);
  const handleDeviceTypeChange = (e) => setDeviceType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert lat and lng to numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    // Check if conversion was successful
    if (isNaN(latitude) || isNaN(longitude)) {
      // Handle invalid latitude or longitude (e.g., show an error message)
      toast.error("Invalid latitude or longitude. Please enter valid numbers.");
      return;
    }

    const data = {
      createdAt: Date.now(),
      creatorUser: {
        name: session?.user?.name,
        email: session?.user?.email,
        id: session?.user?.id,
      },
      deviceId: deviceId,
      rtuId: rtuId,
      GatewayId: GatewayId,
      location: { lat: latitude, lng: longitude },
      type: deviceType,
      status: "active",
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
      router.push("/admin");
    });
  };

  return (
    <section className="md:px-8 px-2 bg-white border h-full rounded-xl">
      <div className="py-8 lg:py-10 md:px-4 px-2 p-2 rounded-2xl mx-auto  max-w-4xl ">
        <div className="flex space-x-2">
          <IoChevronBack
            className="text-2xl text-gray-800 bg-blue-500 p-1 my-auto rounded cursor-pointer"
            onClick={() => router.back()}
          />
          <h2 className="text-2xl font-bold  text-gray-800">Create Device</h2>
        </div>
        <p className="mb-8 lg:mb-8  text-gray-600 text-sm ">
          Create a new device and register it with the system.
        </p>
        <form method="POST" className="md:space-y-8 space-y-4">
          {/* <div>
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
          </div> */}

          <div className="">
            <h3 className="block mb-2 text-sm font-medium text-gray-900">
              Choose Device Type
            </h3>
            <ul className="grid w-full gap-2 md:grid-cols-3">
              <li>
                <input
                  type="radio"
                  id="gateway-option"
                  name="clubVisibility"
                  value="Gateway Device"
                  defaultChecked
                  onChange={handleDeviceTypeChange}
                  className="hidden peer"
                  required=""
                />
                <label
                  for="gateway-option"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-2 border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-navbarDark dark:hover:bg-gray-900"
                >
                  <div className="block">
                    <div className="w-full font-semibold text-gray-700">
                      Gateway Device
                    </div>
                    <div className="w-full text-xs">
                      This device is a Gateway Device.
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="flowbite-option"
                  name="clubVisibility"
                  value="LWMS RTU"
                  onChange={handleDeviceTypeChange}
                  className="hidden peer"
                />
                <label
                  for="flowbite-option"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-2 border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-navbarDark dark:hover:bg-gray-900"
                >
                  <div className="block">
                    <div className="w-full font-semibold text-gray-700">
                      LWMS RTU
                    </div>
                    <div className="w-full text-xs">
                      This device is a LWMS RTU.
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="react-option"
                  name="clubVisibility"
                  value="AMS RTU"
                  onChange={handleDeviceTypeChange}
                  className="hidden peer"
                  required=""
                />
                <label
                  for="react-option"
                  className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-2 border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-navbarDark dark:hover:bg-gray-900"
                >
                  <div className="block">
                    <div className="w-full font-semibold text-gray-700">
                      AMS RTU
                    </div>
                    <div className="w-full text-xs">
                      This device is a AMS RTU.
                    </div>
                  </div>
                </label>
              </li>
            </ul>
          </div>

          <div>
            <label
              htmlFor="GatewayId"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gateway ID
            </label>
            <input
              type="text"
              id="GatewayId"
              className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
              onChange={handleGatewayIdChange}
              defaultValue={GatewayId}
              required
            />
          </div>
          {deviceType !== "Gateway Device" ? (
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
                defaultValue={rtuId}
                required
              />
            </div>
          ) : null}

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
                  type="number"
                  id="lat"
                  onChange={handleLatChange}
                  defaultValue={lat}
                  className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lng"
                  className="block mb-2 text-xs font-medium text-gray-900"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  id="lng"
                  className="block p-3 w-full text-sm  bg-gray-200 rounded border   focus:ring-primary-500 focus:border-primary-500 bg-navbar border-gray-300 placeholder-gray-800 text-gray-900 focus:ring-primary-500 focus:border-primary-500 -light"
                  onChange={handleLngChange}
                  defaultValue={lng}
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
