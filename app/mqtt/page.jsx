"use client";
// pages/mqttPage.js
import { useEffect } from "react";
import mqtt from "mqtt";
import { connect } from "mqtt"; // import connect from mqtt

const MqttPage = () => {
  useEffect(() => {
    // Your existing MQTT code goes here
    // const mqtt = require("mqtt");

    var reconnectTimeout = 2000;
    var host = "3.109.48.213"; // change this
    var port = 9001;

    var topics = ["Central_1", "Central_2"];

    // Declare mqttClient outside of the MQTT_SUBSCRIBE function
    const mqttClient = mqtt.connect(`mqtt://${host}:${port}`);

    MQTT_SUBSCRIBE();

    function MQTT_SUBSCRIBE() {
      munib("munib...........chauhan..........");
      var clientID = "clientID - " + parseInt(Math.random() * 100);

      console.log("connecting to " + host + " " + port);

      mqttClient.on("connect", onConnect);
      mqttClient.on("message", onMessageArrived);
      mqttClient.on("error", onConnectionLost);

      function onConnect() {
        console.log("Connected to MQTT broker");
        for (let i = 0; i < topics.length; i++) {
          mqttClient.subscribe(topics[i]);
          console.log(`Subscribed to topic: ${topics[i]}`);
        }
      }

      function onConnectionLost(error) {
        if (error) {
          console.log("Connection lost. Reconnecting...");
          setTimeout(MQTT_SUBSCRIBE, reconnectTimeout);
        }
      }
    }

    function onMessageArrived(topic, message) {
      console.log(`Message received on topic ${topic}: ${message.toString()}`);
      // Additional processing based on the received message can be done here
    }

    function munib(data) {
      console.log(data);
    }

    // Remember to clean up the MQTT connection when the component unmounts
    return () => {
      console.log("Closing MQTT connection");
      mqttClient.end();
    };
  }, []); // useEffect dependency array to ensure this runs only once on mount

  return (
    <div>
      <h1>MQTT Page</h1>
      {/* Your component content goes here */}
    </div>
  );
};

export default MqttPage;
