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

  const options = {
    onSuccess: onConnect,
  };

  mqtt.connect(options);

  // Subscribe to the specified topic
  if (topic) {
    mqtt.subscribe(topic);
    console.log("Subscribed to " + topic);
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

export { MQTT_SUBSCRIBE, Unsubscribe, PublishData };
