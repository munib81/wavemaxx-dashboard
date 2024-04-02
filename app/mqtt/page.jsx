"use client";
// Import necessary React components and useEffect
import React, { useState, useEffect } from "react";
// import { MQTT_SUBSCRIBE, Unsubscribe, PublishData } from "../../mqttHandler";
import { Client, Message } from "paho-mqtt"; // Import both Client and Message

let mqtt;
const host = "3.109.48.213"; // Change this
const port = 9001;
const topics = ["Gateway_1", "Gateway_2"];

function MQTT_SUBSCRIBE(topic) {
  const clientID = "clientID - " + parseInt(Math.random() * 100);

  console.log("connecting to " + host + " " + port);
  mqtt = new Client(host, port, clientID);
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;

  // const options = {
  //   onSuccess: onConnect,
  // };
  var options = {
    //useSSL:true,
    userName: "flipkar",
    password: "flipkartBLR",
    timeout: 3,
    onSuccess: onConnect,
    // onFailure: OnfailerM,
  };

  mqtt.connect(options);

  // Subscribe to the specified topic
  if (topic) {
    console.log("Subscribed to" + topic);
    mqtt.subscribe(topic);
    console.log("Connected Successfully" + topic);
  }
}

function Unsubscribe() {
  if (mqtt) {
    for (let i = 0; i < topics.length; i++) {
      mqtt.unsubscribe(topics[i]);
    }
  }
}

// function onConnect() {
//   for (let i = 0; i < topics.length; i++) {
//     mqtt.subscribe(topics[i]);
//   }

//   // Once a connection has been made, make a subscription and send a message.
//   console.log("onConnect");
//   const message = new Paho.MQTT.Message("Hello");
//   message.destinationName = "World";
//   mqtt.send(message);
// }

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    MQTT_SUBSCRIBE();
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived: " + message.payloadString);

  // Assuming payload format is:
  // DeviceID,RequestType,ValveStatuses...,Limit1,Limit2,Battery,Flow1,Flow2,PT1,PT2,CentLimit1,CentLimit2,CentBattery,GSMSIG
  const data = message.payloadString.split(",");

  // Extracting data based on assumed indexes
  const DeviceID = parseInt(data[0], 16);
  const RequestType = parseInt(data[1], 16);
  const ValveStatuses = data.slice(2, 12).map((val) => parseInt(val, 16)); // Example for multiple valve statuses
  const Limit1 = parseInt(data[12], 16);
  const Limit2 = parseInt(data[13], 16);
  const Battery = parseInt(data[14], 16);
  const Flow1 = parseInt(data[15], 16);
  const Flow2 = parseInt(data[16], 16);
  const PT1 = parseInt(data[17], 16);
  const PT2 = parseInt(data[18], 16);
  const CentLimit1 = parseInt(data[19], 16);
  const CentLimit2 = parseInt(data[20], 16);
  const CentBattery = parseInt(data[21], 16);
  const GSMSIG = parseInt(data[22], 16);

  // Logging extracted data with proper naming
  console.log(`Device ID: ${DeviceID}`);
  console.log(`Request Type: ${RequestType}`);
  ValveStatuses.forEach((status, index) => {
    console.log(`Valve ${index + 1} Status: ${status}`);
  });
  console.log(`Door Limit Switch 1: ${Limit1}`);
  console.log(`Door Limit Switch 2: ${Limit2}`);
  console.log(`Battery Level: ${Battery}`);
  console.log(`Flow Rate 1: ${Flow1}`);
  console.log(`Flow Rate 2: ${Flow2}`);
  console.log(`Pressure Transducer 1: ${PT1}`);
  console.log(`Pressure Transducer 2: ${PT2}`);
  console.log(`Gateway Door Limit Switch 1: ${CentLimit1}`);
  console.log(`Gateway Door Limit Switch 2: ${CentLimit2}`);
  console.log(`Gateway Battery Level: ${CentBattery}`);
  console.log(`GSM Signal Strength: ${GSMSIG}`);
}

function PublishData(data, top) {
  const message = new Message(data);
  message.destinationName = top;
  mqtt.send(message);
}

function onConnect() {
  for (let i = 0; i < topics.length; i++) {
    mqtt.subscribe(topics[i]);
  }

  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  const message = new Message("Hello"); // Use Message from Paho MQTT
  message.destinationName = "World";
  mqtt.send(message);
}

const MQTTPage = () => {
  const [GatewayDevice, setGatewayDevice] = useState("");
  const [remoteDevice, setRemoteDevice] = useState("");

  const handleGatewayDeviceChange = (event) => {
    setGatewayDevice(event.target.value);
  };

  const handleRemoteDeviceChange = (event) => {
    setRemoteDevice(event.target.value);
  };

  useEffect(() => {
    // Subscribe to MQTT topics based on the selected devices
    if (GatewayDevice) {
      MQTT_SUBSCRIBE(`Gateway_${GatewayDevice}`);
    }
    if (remoteDevice) {
      MQTT_SUBSCRIBE(`Remote_${remoteDevice}`);
    }

    // Cleanup on component unmount
    return () => {
      Unsubscribe();
    };
  }, [GatewayDevice, remoteDevice]);

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
          Select Gateway Device:
        </label>
        <select
          defaultValue={GatewayDevice}
          onChange={() => handleGatewayDeviceChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option defaultValue="">Select Gateway Device</option>
          <option value="1">Gateway_001</option>
          <option value="2">Gateway_002</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Select Remote Device:
        </label>
        <select
          defaultValue={remoteDevice}
          onChange={() => handleRemoteDeviceChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option defaultValue="">Select Remote Device</option>
          <option value="1">Remote_1</option>
          <option value="2">Remote_2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button
        onClick={() => MQTT_SUBSCRIBE("Gateway_1")}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Send MQTT Data
      </button>
    </div>
  );
};

export default MQTTPage;
