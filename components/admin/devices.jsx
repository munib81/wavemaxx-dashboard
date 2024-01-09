import React, { useState, useEffect } from "react";

const Devices = ({ deviceDetails }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

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
      className="rounded-lg mx-auto mb-4 w-full p-4 bg-gray-200 relative overflow-hidden"
    >
      <div className="md:flex items-center md:justify-between justify-normal">
        {/* Device Details */}
        <div className="flex">
          <img
            alt="User avatar"
            className="sm:w-10 sm:h-10 h-8 w-8 object-cover bg-gray-50 p-1 rounded-full"
            // src="./logo.png"
            // class="w-12 h-12 mb-3 me-3 rounded-full bg-red-400 sm:mb-0"
            src="https://images.ctfassets.net/o7xu9whrs0u9/1mpMDYVC8k7iFgFzM99SnS/c2dfa0df9cb6d6c8643c60b0657326fe/technology-hl.svg"
          />
          <div className="pl-3">
            <div className="font-medium bg-gray-500 w-fit px-1 rounded text-gray-100 sm:text-base text-sm">
              {deviceDetails.centralId}
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
              {deviceDetails.centralId}
            </span>
          </div>
          <div className="flex flex-col ml-4">
            <span className="text-sm text-gray-500">
              {deviceDetails.location?.lat}
            </span>
            <span className="text-sm text-gray-500">
              {deviceDetails.location?.long}
            </span>
          </div>
        </div> */}
        <button
          onClick={() => openEditPopup(deviceDetails)}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-2 rounded"
        >
          Edit
        </button>
      </div>
      {editModalVisible && (
        <EditDeviceModal device={selectedDevice} closePopup={closeEditPopup} />
      )}
    </div>
  );
};

const EditDeviceModal = ({ device, closePopup }) => {
  const [rtuId, setRtuId] = useState("");
  const [centralId, setCentralId] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  useEffect(() => {
    if (device) {
      setRtuId(device.rtuId || "");
      setCentralId(device.centralId || "");
      setLat(device.location?.lat || "");
      setLong(device.location?.long || "");
    }
  }, [device]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the update logic here
    console.log("Update Device:", { rtuId, centralId, lat, long });
    closePopup();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 flex items-center place-content-center justify-center  ">
      <div
        onClick={closeEditPopup}
        className="bg-gray-800 bg-opacity-50 h-screen w-full absolute"
      ></div>
      <div
        id="ideaModal"
        tabIndex="-1"
        className="z-50 w-fit overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow-xl dark:bg-navbar border border-gray-300"
      >
        <div className="relative w-full max-w-xl p-4 text-center bg-white rounded-lg shadow  sm:p-5">
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
          <svg
            className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="M19.9 6.58c0-.009 0-.019-.006-.027l-2-4A1 1 0 0 0 17 2h-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.3c-.03.165-.047.332-.051.5a3.25 3.25 0 1 0 6.5 0A3.173 3.173 0 0 0 7.7 12h4.6c-.03.165-.047.332-.051.5a3.25 3.25 0 1 0 6.5 0 3.177 3.177 0 0 0-.049-.5h.3a1 1 0 0 0 1-1V7a.99.99 0 0 0-.1-.42ZM16.382 4l1 2H13V4h3.382ZM4.5 13.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm11 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
          </svg>
          <form onSubmit={handleSubmit}>
            <div>
              <label>RTU ID</label>
              <input
                type="text"
                value={rtuId}
                onChange={(e) => setRtuId(e.target.value)}
              />
            </div>
            <div>
              <label>Central ID</label>
              <input
                type="text"
                value={centralId}
                onChange={(e) => setCentralId(e.target.value)}
              />
            </div>
            <div>
              <label>Latitude</label>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div>
              <label>Longitude</label>
              <input
                type="text"
                value={long}
                onChange={(e) => setLong(e.target.value)}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button onClick={closePopup}>Close</button>
          </form>
          <div className="flex justify-center items-center space-x-4">
            <button
              type="submit"
              id="deleteYes"
              data-modal-toggle="deleteModal"
              onClick={() => handleCreateShipments(order)}
              className="py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 "
            >
              Ship order
            </button>
            <button
              data-modal-toggle="deleteModal"
              onClick={closeEditPopup}
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
