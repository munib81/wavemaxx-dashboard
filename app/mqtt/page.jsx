"use client";
// Import necessary React components and useEffect
import React, { useState, useEffect } from "react";
import { MQTT_SUBSCRIBE, Unsubscribe, PublishData } from "../../mqttHandler";

const MQTTPage = () => {
  const [centralDevice, setCentralDevice] = useState("");
  const [remoteDevice, setRemoteDevice] = useState("");

  const handleCentralDeviceChange = (event) => {
    setCentralDevice(event.target.value);
  };

  const handleRemoteDeviceChange = (event) => {
    setRemoteDevice(event.target.value);
  };

  useEffect(() => {
    // Subscribe to MQTT topics based on the selected devices
    if (centralDevice) {
      MQTT_SUBSCRIBE(`Central_${centralDevice}`);
    }
    if (remoteDevice) {
      MQTT_SUBSCRIBE(`Remote_${remoteDevice}`);
    }

    // Cleanup on component unmount
    return () => {
      Unsubscribe();
    };
  }, [centralDevice, remoteDevice]);

  const sendData = () => {
    const data = "232";
    const topic = "23";
    PublishData(data, topic);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">MQTT Page</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Select Central Device:
        </label>
        <select
          value={centralDevice}
          onChange={handleCentralDeviceChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select Central Device</option>
          <option value="1">Central_001</option>
          <option value="2">Central_002</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Select Remote Device:
        </label>
        <select
          value={remoteDevice}
          onChange={handleRemoteDeviceChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select Remote Device</option>
          <option value="1">Remote_1</option>
          <option value="2">Remote_2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button
        onClick={sendData}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Send MQTT Data
      </button>
    </div>
  );
};

export default MQTTPage;
