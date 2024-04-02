//=================================Hadnle Varible Define =========================================================
const sidMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const CloseBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const ValveHandle = document.querySelectorAll(".middle");
const ValveButtonH = document.querySelectorAll(".lock-toggler");
const DoorHandle = document.querySelectorAll(".Door-limit");
const BatteryHandleAndSignal = document.querySelectorAll(".Battery-percent");

const RemoteDeviceStatus = document.querySelector(".profile-photo");
const GatewayDeviceStatus = document.querySelector(".Status");

const DeviceSelectSection = document.querySelectorAll(".SelectCss");

const DisableControlMiddle = document.querySelectorAll(".insights");
const DisableControlRight = document.querySelectorAll(".sales-analytics"); //sales-analytics

const FlowRetSet = document.querySelectorAll(".FlowDet");
const valveBaseVlue = 2;

var timecount = 0;
//----------------------index---------------------------------------------------------------------------
const remoteBattery = 0;
const GatewayBattery = 1;
const batteryUnknown = 0;
const batteryCritical = 1;
const batteryLow = 2;
const batterygood = 3;
const batteryfull = 4;

const RemoteDoor = 0;
const GatewayeDoor = 1;
const StatusClose = 0;
const StatusOpen = 1;

const DoorSwitch1 = 0;
const DoorSwitch2 = 1;

const PressureInlet = 1;
const PressureOutlet = 2;
const MainValves = 0;
const MainValve = 1;
const Valve1 = 2;
const Valve2 = 3;
const Valve3 = 4;
const Valve4 = 5;
const Valve5 = 6;
const Valve6 = 7;
const Valve7 = 8;
const Valve8 = 9;
const valveOn = 1;
const valaveOff = 0;

const SignalSHow = 1;
const Signal1 = 1;
const Signal2 = 2;
const Signal3 = 3;
const Signal4 = 4;

const DeviceActive = 1;
const DeviceInactive = 0;

//-----------------------------------------------------------------------------------------------------

// setBattery(BatteryHandleAndSignal[remoteBattery],batterygood);
// setBattery(BatteryHandleAndSignal[GatewayBattery],batterygood);

// DoorOpenHandle(DoorHandle[RemoteDoor],StatusOpen,DoorSwitch1,"05:30 13/03/2023","05:30 13/03/2023");
//DoorOpenHandle(DoorHandle[GatewayeDoor],StatusOpen,DoorSwitch2,"05:30 13/03/2023","05:30 13/03/2023" );

// DoorOpenHandle(DoorHandle[1],StatusOpen,DoorSwitch1,"05:30 13/03/2023","05:30 13/03/2023");
// DoorOpenHandle(DoorHandle[1],StatusOpen,DoorSwitch2,"05:30 13/03/2023","05:30 13/03/2023" );

// SetPressure(PressureInlet,0.4,"05:30 13/03/2023"); //0-1,0-10
// SetPressure(PressureOutlet,4,"05:30 13/03/2023");

//DeviceStatusShow(RemoteDeviceStatus,DeviceActive);
//DeviceStatusShow(GatewayDeviceStatus,DeviceActive);

//======================================MQTT VAR====================================================
var mqtt;
var reconnectTimeout = 2000;
var host = "3.109.48.213"; //change this
var port = 9001;

var topics = [];

//==================================================================================================

//-------open menu------------------------------------------------------------------------
menuBtn.addEventListener("click", () => {
  sidMenu.style.display = "block";
});

//---------------close menu---------------------------------------------------------------
CloseBtn.addEventListener("click", () => {
  sidMenu.style.display = "none";
});

//----------------------theme -togle------------------------------------------------------
themeToggler.addEventListener("click", () => {
  console.log("gfggfgfgf");
  document.body.classList.toggle("dart-theme-variables");
  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

//==============================Door Handle==================================================
function DoorOpenHandle(doorH, sts, dorN, TimOpen, TimClose) {
  console.log("limit..");
  console.log(dorN);
  console.log(sts);
  doorString = doorH.querySelectorAll("h4");
  timestring = doorH.querySelectorAll(".text-muted");
  doorimg = doorH.querySelectorAll("img");
  indx = doorimg.length - 1;

  if (sts == 1) {
    console.log("open door");
    doorString[dorN].querySelector("span").innerHTML = "OPEN";
    doorString[dorN].querySelector("span").style = "color:green";
    doorimg[indx].src = "./images/gate.gif";
  } else {
    console.log("close door");
    doorString[dorN].querySelector("span").innerHTML = "CLOSE";
    doorString[dorN].querySelector("span").style = "color:red";
    doorimg[indx].src = "./images/gateC.png";
  }
  timestring[0].querySelector("span").innerHTML = TimOpen;
  timestring[1].querySelector("span").innerHTML = TimClose;
}

//========================================Pressuer show Handle=========================================================
function SetPressure(inlet, value, tiM) {
  var BarPrecent = value / 10;
  var precentV = 225 * (1 - BarPrecent);
  console.log("setting pressure");
  console.log(inlet, value, precentV);

  elem = ValveHandle[inlet].querySelector("circle").style.strokeDashoffset =
    precentV;
  ValveHandle[inlet].querySelector("p").innerHTML =
    Math.floor(BarPrecent * 100) + "%";
  ValveHandle[inlet].querySelector("h2").innerHTML =
    value + "(<span>bar</span>)";
  console.log(elem);

  if (inlet == PressureInlet) {
    mun = document.querySelector(".inlet-transducer small");
    mun.innerHTML = tiM;
  } else if (inlet == PressureOutlet) {
    mun = document.querySelector(".outlet-transducer small");
    mun.innerHTML = tiM;
  }
}

//================================================Valve Open Close Button Handle=======================================
function ValveButtonHandle(number) {
  if (
    DeviceSelectSection[0].value == "0" ||
    DeviceSelectSection[1].value == "0"
  )
    return;
  pubData = "*#,22,1,2," + number + ","; //,start,deviceId,cmdType,valvlenumber,statu
  topic = "GatewayR_" + DeviceSelectSection[0].value;
  console.log("valve number....");
  console.log(number);

  locks = ValveButtonH[number].querySelectorAll("span");
  console.log(locks[0]);
  console.log(locks[1]);
  close = locks[0].classList;
  open = locks[1].classList;

  openF = 0;
  if (close[1] == "active") {
    locks[0].classList.remove("active");
    locks[1].classList.add("active");
    pubData = pubData + "2";
    openF = 1;
  } else if (open[1] == "active") {
    locks[1].classList.remove("active");
    locks[0].classList.add("active");
    pubData = pubData + "1";
  }
  console.log(pubData);
  PublishData(pubData, topic);
  switch (number) {
    case 0:
      if (openF == 1) valveOpenHandle(MainValves, valveOn);
      else valveOpenHandle(MainValves, valaveOff);
      break;
    case 1:
      if (openF == 1) valveOpenHandle(MainValve, valveOn);
      else valveOpenHandle(MainValve, valaveOff);
      break;
    case 2:
      if (openF == 1) valveOpenHandle(Valve1, valveOn);
      else valveOpenHandle(Valve1, valaveOff);
      break;

    case 3:
      if (openF == 1) valveOpenHandle(Valve2, valveOn);
      else valveOpenHandle(Valve2, valaveOff);
      break;
    case 4:
      if (openF == 1) valveOpenHandle(Valve3, valveOn);
      else valveOpenHandle(Valve3, valaveOff);
      break;
    case 5:
      if (openF == 1) valveOpenHandle(Valve4, valveOn);
      else valveOpenHandle(Valve4, valaveOff);
      break;
    case 6:
      if (openF == 1) valveOpenHandle(Valve5, valveOn);
      else valveOpenHandle(Valve5, valaveOff);
      break;
    case 7:
      if (openF == 1) valveOpenHandle(Valve6, valveOn);
      else valveOpenHandle(Valve6, valaveOff);
      break;
    case 8:
      if (openF == 1) valveOpenHandle(Valve7, valveOn);
      else valveOpenHandle(Valve7, valaveOff);
      break;
    case 9:
      if (openF == 1) valveOpenHandle(Valve8, valveOn);
      else valveOpenHandle(Valve8, valaveOff);
      break;
  }
}

//==================================Valve Open Close Status Handle=======================================================

function valveOpenHandle(valve_number, statusS) {
  var valve_ActualNum = 0;
  if (valve_number != 0) valve_ActualNum = valve_number + valveBaseVlue;
  console.log("setting valve");
  console.log(valve_number);
  console.log(statusS);
  if (statusS == 0) {
    ValveHandle[valve_ActualNum]
      .querySelectorAll("h1")[0]
      .classList.add("active");
    ValveHandle[valve_ActualNum]
      .querySelectorAll("h1")[1]
      .classList.remove("active");

    if (valve_ActualNum == valveBaseVlue + 1 || valve_ActualNum == 0)
      ValveHandle[valve_ActualNum].querySelector("img").src =
        "./images/gipc.png";
    else
      ValveHandle[valve_ActualNum].querySelector("img").src =
        "./images/sprinklerC.png";
  } else {
    ValveHandle[valve_ActualNum]
      .querySelectorAll("h1")[0]
      .classList.remove("active");
    ValveHandle[valve_ActualNum]
      .querySelectorAll("h1")[1]
      .classList.add("active");
    if (valve_ActualNum == valveBaseVlue + 1 || valve_ActualNum == 0)
      ValveHandle[valve_ActualNum].querySelector("img").src =
        "./images/gip.gif";
    else
      ValveHandle[valve_ActualNum].querySelector("img").src =
        "./images/sprinkler.gif";
  }
}

//===========================================Set Battery Percentage===================================
function setBattery(batteryHandle, value) {
  console.log("SetBattery....");
  console.log(value);
  elem = batteryHandle.querySelector("span");
  switch (value) {
    case 0: // unkonw
      elem.innerHTML = "battery_unknown";
      elem.style["color"] = "black";
      break;
    case 1: // critical
      elem.innerHTML = "battery_1_bar";
      elem.style["color"] = "red";
      break;
    case 2: //low
      elem.innerHTML = "battery_2_bar";
      elem.style["color"] = "orange";
      break;
    case 3: //good
      elem.innerHTML = "battery_6_bar";
      elem.style["color"] = "green";
      break;
    case 4: //full
      elem.innerHTML = "battery_full";
      elem.style["color"] = "green";
      break;
  }
}

//==============================================GSM Network Info==========================================
function SetGatewayNetwork(hancle, value) {
  elem = hancle.querySelectorAll("span")[1];
  switch (value) {
    case 1:
      elem.innerHTML = "signal_wifi_off";
      break;
    case 1:
      elem.innerHTML = "network_wifi_1_bar";
      break;
    case 2:
      elem.innerHTML = "network_wifi_2_bar";
      break;
    case 3:
      elem.innerHTML = "network_wifi_3_bar";
      break;
    case 4:
      elem.innerHTML = "signal_wifi_4_bar";
      break;
  }
}

//==================================Log Out====================================================================
function logout() {
  document.cookie = "id=;";
  document.cookie = "login=;";
  window.open("index.html", "_self");
}

//===================================AsideBasr Handle Menu=======================================================
function asideSelect(Aindex) {
  console.log("aside change");
  switch (Aindex) {
    case 1:
      window.open("Dashbord.html", "_self");
      break;
    case 2:
      window.open("Gateway.html", "_self");
      break;
    case 3:
      window.open("Setting.html", "_self");
      break;
  }
}

function SelectGatewayDevice(inputType) {
  console.log("mmmmmmmmmmmmmmm");
  console.log(DeviceSelectSection[0].value);
  console.log(DeviceSelectSection[1].value);

  if (inputType == 1) {
    DeviceSelectSection[1].value = "0";
    if (DeviceSelectSection[0].value == "0") {
      DeviceSelectSection[1].disabled = true;
    } else {
      DeviceSelectSection[1].disabled = false;
    }

    if (
      parseInt(DeviceSelectSection[0].value) == 0 ||
      parseInt(DeviceSelectSection[1].value) == 0
    ) {
      console.log("both 0");
      DisableControlMiddle[0].style.opacity = 0.3;
      DisableControlRight[0].style.opacity = 0.3;
    } else {
      console.log("dfdfdf");
      DisableControlMiddle[0].style.opacity = 1;
      DisableControlRight[0].style.opacity = 1;
    }
    DisconnectClient();
    //console.log("munibibb");
    //console.log(DeviceSelectSection[0].value);
  } else if (inputType == 2) {
    if (
      DeviceSelectSection[0].value == "0" ||
      DeviceSelectSection[1].value == "0"
    ) {
      DisableControlMiddle[0].style.opacity = 0.3;
      DisableControlRight[0].style.opacity = 0.3;

      return;
    } else {
      console.log("dfdfdf");
      DisableControlMiddle[0].style.opacity = 1;
      DisableControlRight[0].style.opacity = 1;
    }

    var GatewaytOPIC = "Gateway_" + DeviceSelectSection[0].value;
    topics[0] = GatewaytOPIC;
    console.log(topics[0]);

    console.log(mqtt);
    if (mqtt != undefined) DisconnectClient();
    else console.log(" no mqqtt");
    MQTT_SUBSCRIBE();
  }
}

//==========================================Show Device Status Function=======================================
function DeviceStatusShow(handle, sts) {
  if (sts == 1) {
    handle.classList.add("active");
    handle.querySelector("img").src = "./images/greenSig.png";
  } else {
    handle.classList.remove("active");
    handle.querySelector("img").src = "./images/greenblack.png";
  }
}

//================================MQTT========================================================================================

function MQTT_SUBSCRIBE() {
  var clientID = "clientID - " + parseInt(Math.random() * 100);

  console.log("connecting to " + host + " " + port);
  mqtt = new Paho.MQTT.Client(host, port, clientID);

  //document.write("connecting to "+ host);

  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;
  var options = {
    //useSSL:true,
    timeout: 3,
    onSuccess: onConnect,
  };

  mqtt.connect(options); //connect
}

function DisconnectClient() {
  console.log("client is disconnecting..");
  mqtt.disconnect();
}

function Unsubscribe() {
  for (i = 0; i < topics.length; i++) {
    mqtt.unsubscribe(topics[i]);
  }
}

function onConnect() {
  for (i = 0; i < topics.length; i++) {
    mqtt.subscribe(topics[i]);
  }
  console.log("connected");
  if (DeviceSelectSection[1] != "0") {
    console.log("get status");
    Data = "*#,22," + DeviceSelectSection[1].value + ",13";
    topic = "GatewayR_" + DeviceSelectSection[0].value;
    PublishData(Data, topic);
  }
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    MQTT_SUBSCRIBE();
  }
  console.log("connection lost");
}

function onMessageArrived(message) {
  var destinationName = "Gateway_" + DeviceSelectSection[0].value;
  if ((message.destinationName = destinationName)) {
    console.log("OnMessageArrived: " + message.payloadString);
    var messagD = message.payloadString;
    const myArray = messagD.split(",");
    DeviceID = Number("0x" + myArray[1]);
    RequestType = Number("0x" + myArray[2]);
    console.log(myArray.length);
    timecount = 0;
    if (RequestType == 0) {
      //mode=Number(myArray[3]);
      MainValveS0 = Number("0x" + myArray[3]);
      MainValveS = Number("0x" + myArray[4]);
      console.log(MainValveS);

      // valve1=Number("0x"+myArray[4]);
      // valve2=Number("0x"+myArray[5]);
      // valve3=Number("0x"+myArray[6]);
      // valve4=Number("0x"+myArray[7]);
      valve5 = Number("0x" + myArray[5]);
      valve6 = Number("0x" + myArray[6]);
      valve7 = Number("0x" + myArray[7]);
      valve8 = Number("0x" + myArray[8]);
      valve9 = Number("0x" + myArray[9]);
      valve10 = Number("0x" + myArray[10]);

      Limit1 = Number("0x" + myArray[11]);
      Limit2 = Number("0x" + myArray[12]);

      Battery = Number("0x" + myArray[13]);

      console.log("gfffffffffffffffffff");
      console.log(myArray[14]);
      console.log(myArray[15]);
      console.log(myArray[16]);
      Flow1 = Number("0x" + myArray[14]) * 256 + Number("0x" + myArray[15]);
      Flow2 = Number("0x" + myArray[16]) * 256 + Number("0x" + myArray[17]);

      PT1 = Number("0x" + myArray[18]) * 256 + Number("0x" + myArray[19]);
      PT2 = Number("0x" + myArray[20]) * 256 + Number("0x" + myArray[21]);
      PT3 = Number("0x" + myArray[22]) * 256 + Number("0x" + myArray[23]);
      PT4 = Number("0x" + myArray[24]) * 256 + Number("0x" + myArray[25]);
      //---------------------------Gateway----------------------------------------
      CentLimit1 = Number("0x" + myArray[26]);
      CentLimit2 = Number("0x" + myArray[27]);
      CentBattery = Number("0x" + myArray[28]);
      GSMSIG = Number("0x" + myArray[29]);

      SetValve(0, MainValveS0);
      SetValve(1, MainValveS);
      //SetValve(2,valve1);
      //SetValve(3,valve2);

      SetValve(2, valve5);
      SetValve(3, valve6);
      SetValve(4, valve7);
      SetValve(5, valve8);
      SetValve(6, valve9);
      SetValve(7, valve10);
      console.log("floooo");
      console.log(Flow1);
      console.log(Flow2);
      FlowRetSet[0].innerHTML = (Flow1 / 1000).toFixed(2) + "Lps";
      FlowRetSet[1].innerHTML = (Flow2 / 1000).toFixed(2) + "Lps";
      //-----------------------set Limit----------------------------------------------------------------
      //DoorOpenHandle(DoorHandle[RemoteDoor],Limit1|Limit2,DoorSwitch1,"05:30 13/03/2023","05:30 13/03/2023");
      // DoorOpenHandle(DoorHandle[RemoteDoor],Limit2|Limit1,DoorSwitch1,"05:30 13/03/2023","05:30 13/03/2023"); //DoorSwitch2

      DoorOpenHandle(
        DoorHandle[GatewayeDoor - 1],
        CentLimit1 | CentLimit2,
        DoorSwitch1,
        "05:30 13/03/2023",
        "05:30 13/03/2023"
      );
      DoorOpenHandle(
        DoorHandle[GatewayeDoor - 1],
        CentLimit1 | CentLimit2,
        DoorSwitch2,
        "05:30 13/03/2023",
        "05:30 13/03/2023"
      );

      //    //--------------------set flow----------------------------------------------------------------------

      //    //---------------------------------Set Battery-------------------------------------------

      setBattery(BatteryHandleAndSignal[remoteBattery], Battery + 1);

      setBattery(BatteryHandleAndSignal[GatewayBattery], CentBattery + 1);

      //-----------------Set Pressure--------------------------------------------------------
      //    SetPressure(PressureInlet,PT2/1000,"05:30 13/03/2023","05:30 13/03/2023");
      //    SetPressure(PressureOutlet,PT2/1000,"05:30 13/03/2023","05:30 13/03/2023");
      SetPressure(PressureInlet, PT2, "05:30 13/03/2023", "05:30 13/03/2023");
      SetPressure(PressureOutlet, PT3, "05:30 13/03/2023", "05:30 13/03/2023");

      //----------------------------------Gateway GSM Signal Set----------------------------------------------

      SetGatewayNetwork(BatteryHandleAndSignal[GatewayBattery], GSMSIG);

      //----------------------------------------Active Status SHow-----------------------------------------------
      DeviceStatusShow(RemoteDeviceStatus, 1);
      DeviceStatusShow(GatewayDeviceStatus, 1);
      //
    }
  }
}

function SetValve(numbrt, status) {
  valveOpenHandle(numbrt, status);
  locks = ValveButtonH[numbrt].querySelectorAll("span");

  console.log(status);
  if (status == 0) {
    locks[1].classList.remove("active");
    locks[0].classList.add("active");
  } else {
    locks[0].classList.remove("active");
    locks[1].classList.add("active");
  }
}

function PublishData(data, top) {
  message = new Paho.MQTT.Message(data);
  message.destinationName = top;
  mqtt.send(message);
}

setInterval(TimeOutStatus, 20000);

function TimeOutStatus() {
  timecount++;
  console.log("count: ");
  console.log(timecount);
  if (timecount == 10) {
    DeviceStatusShow(RemoteDeviceStatus, 0);
    DeviceStatusShow(GatewayDeviceStatus, 0);
  }
}
