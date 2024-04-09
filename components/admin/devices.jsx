import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Devices = ({ deviceDetails, onUpdate }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [rtuId, setRtuId] = useState("");
  const [GatewayId, setGatewayId] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  //   const handleRtuIdChange = (e) => setRtuId(e.target.value);
  //   const handleGatewayIdChange = (e) => setGatewayId(e.target.value);
  //   const handleLatChange = (e) => setLat(e.target.value);
  //   const handleLngChange = (e) => setLng(e.target.value);
  //   const handleDeviceIdChange = (e) => setDeviceId(e.target.value);
  const handleDeviceTypeChange = (e) => setDeviceType(e.target.value);

  //   useEffect(() => {
  //     if (device) {
  //       setRtuId(device.rtuId || "");
  //       setGatewayId(device.GatewayId || "");
  //       setLat(device.location?.lat || "");
  //       setLng(device.location?.lng || "");
  //     }
  //   }, [device]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDevice = {
      rtuId,
      GatewayId,
      location: { lat, lng },
      // include other fields that might need updating
    };

    try {
      const response = await fetch(`/api/devices/${deviceDetails._id}`, {
        method: "PUT", // or 'PATCH', depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDevice),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onUpdate();

      // Show success toast
      toast.success("Device updated successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Close modal
      setEditModalVisible(false);

      // Optionally, you can also update any local state to reflect the changes
      // setSelectedDevice(updatedDevice); // For example
    } catch (error) {
      console.error("Failed to update device:", error);

      // Show error toast
      toast.error("Failed to update device", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleDeleteDevice = async () => {
    try {
      const response = await fetch(`/api/devices/${deviceDetails._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onUpdate();

      // Show success toast
      toast.success("Device deleted successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Close modal
      setEditModalVisible(false);

      // Optionally, you can also update any local state to reflect the changes
      // setSelectedDevice(updatedDevice); // For example
    } catch (error) {
      console.error("Failed to delete device:", error);

      // Show error toast
      toast.error("Failed to delete device", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const openEditPopup = (device) => {
    setSelectedDevice(device);
    setEditModalVisible(true);
  };

  const closeEditPopup = () => {
    setEditModalVisible(false);
    setSelectedDevice(null);
  };

  return (
    <div
      key={deviceDetails._id}
      className="rounded-lg mx-auto group mb-4 w-full p-4 bg-gray-200 relative overflow-hidden"
    >
      <div className="md:flex items-center md:justify-between justify-normal">
        {/* Device Details */}
        <div className="flex">
          <img
            alt="User avatar"
            className="sm:w-10 sm:h-10 h-8 w-8 object-cover bg-gray-50 p-1 rounded-full"
            // src="./logo.png"
            // className="w-12 h-12 mb-3 me-3 rounded-full bg-red-400 sm:mb-0"
            src={
              deviceDetails.type == "Gateway Device"
                ? "./marker/gateway.png"
                : "./marker/device.png"
            }
          />
          <div className="pl-3">
            <div className="font-medium bg-gray-500 w-fit px-1 rounded text-gray-100 sm:text-base text-sm">
              {deviceDetails.rtuId
                ? deviceDetails.rtuId
                : deviceDetails.GatewayId}
            </div>
            <div className="text-gray-600 sm:text-sm text-xs">
              {deviceDetails.type}
            </div>
          </div>
        </div>
        {/* <div className="flex">
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-gray-700">
              {deviceDetails.rtuId}
            </span>
            <span className="text-sm text-gray-500">
              {deviceDetails.GatewayId}
            </span>
          </div>
          <div className="flex flex-col ml-4">
            <span className="text-sm text-gray-500">
              {deviceDetails.location?.lat}
            </span>
            <span className="text-sm text-gray-500">
              {deviceDetails.location?.lng}
            </span>
          </div>
        </div> */}
        <button
          onClick={() => openEditPopup(deviceDetails)}
          className="bg-indigo-700 hover:bg-indigo-800 hidden group-hover:flex text-white font-semibold py-2 px-2 rounded"
        >
          Edit
        </button>
      </div>
      {editModalVisible && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 flex items-center place-content-center justify-center  ">
          <div
            onClick={closeEditPopup}
            className="bg-gray-800 bg-opacity-50 h-screen w-full absolute"
          ></div>
          <div
            id="ideaModal"
            tabIndex="-1"
            className="z-50 w-fit overflow-x-hidden overflow-y-auto bg-white border rounded-lg shadow-xl dark:bg-navbar border border-gray-300"
          >
            <div className="relative w-full max-w-xl p-4 text-center bg-white border rounded-lg shadow  sm:p-5">
              <button
                type="button"
                onClick={closeEditPopup}
                className="text-gray-400 absolute top-2 right-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                data-modal-toggle="deleteModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex items-center justify-start space-x-2 mb-4">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Edit Device :{" "}
                  <span className="text-gray-500">
                    {deviceDetails.deviceId}
                  </span>
                </h2>
              </div>
              <form onSubmit={handleSubmit} className=" space-y-4">
                {deviceDetails.type !== "Gateway Device" && (
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
                      defaultValue={deviceDetails.rtuId}
                      onChange={(e) => setRtuId(e.target.value)}
                      required
                    />
                  </div>
                )}

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
                    defaultValue={deviceDetails.GatewayId}
                    onChange={(e) => setGatewayId(e.target.value)}
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
                        type="number"
                        id="lat"
                        defaultValue={deviceDetails.location?.lat}
                        onChange={(e) => setLat(e.target.value)}
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
                        defaultValue={deviceDetails.location?.lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <h3 className="block mb-2 text-sm font-medium text-gray-900">
                    Choose Device Type
                  </h3>
                  <ul className="grid w-full gap-2 md:grid-cols-3">
                    {/* Gateway Device as one more type */}
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <input
                        type="radio"
                        id="flowbite-option"
                        name="clubVisibility"
                        value="Gateway"
                        onChange={handleDeviceTypeChange}
                        defaultChecked={deviceDetails.type === "Gateway Device"}
                        className="hidden peer"
                      />
                      <label
                        for="flowbite-option"
                        className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-2 border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-navbarDark dark:hover:bg-gray-900"
                      >
                        <div className="block">
                          {/* <svg
                            className="mb-2 text-green-400 w-7 h-7"
                            fill="currentColor"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                          </svg> */}
                          <div className="w-full font-semibold text-gray-700">
                            Gateway
                          </div>
                          <div className="w-full text-xs">
                            This device is a Gateway.
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
                        defaultChecked={deviceDetails.type === "LWMS RTU"}
                        className="hidden peer"
                      />
                      <label
                        for="flowbite-option"
                        className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-2 border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-navbarDark dark:hover:bg-gray-900"
                      >
                        <div className="block">
                          {/* <svg
                            className="mb-2 text-green-400 w-7 h-7"
                            fill="currentColor"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                          </svg> */}
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
                        defaultChecked={deviceDetails.type === "AMS RTU"}
                        className="hidden peer"
                        required=""
                      />
                      <label
                        for="react-option"
                        className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-2 border-gray-200 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-navbarDark dark:hover:bg-gray-900"
                      >
                        <div className="block">
                          {/* <svg
                            className="mb-2 w-7 h-7 text-sky-500"
                            fill="currentColor"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                          </svg> */}
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

                <div className="flex mt-4 justify-center items-center space-x-4">
                  <button
                    type="submit"
                    id="deleteYes"
                    //   data-modal-toggle="deleteModal"
                    //   onClick={() => handleUpdateDevice()}
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 "
                  >
                    Update Device
                  </button>
                  <button
                    //   data-modal-toggle="deleteModal"
                    onClick={() => handleDeleteDevice()}
                    type="button"
                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
