"use client";
// Import necessary React components and useEffect
import React, { useState, useEffect } from "react";
// import { MQTT_SUBSCRIBE, Unsubscribe, PublishData } from "../../mqttHandler";
import { Client, Message } from "paho-mqtt"; // Import both Client and Message

let mqtt;
const host = "3.109.48.213"; // Change this
const port = 9001;
const topics = ["Central_1", "Central_2"];

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
    console.log("Subscribed to " + topic);
    mqtt.subscribe(topic);
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
  console.log("onMessageArrived:" + message.payloadString);
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
          defaultValue={centralDevice}
          onChange={() => handleCentralDeviceChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option defaultValue="">Select Central Device</option>
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
        onClick={() => MQTT_SUBSCRIBE("Central_1")}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Send MQTT Data
      </button>
    </div>
  );
};

export default MQTTPage;
