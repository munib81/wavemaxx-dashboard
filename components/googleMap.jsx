import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Link from "next/link";
import { FaBatteryThreeQuarters, FaDotCircle } from "react-icons/fa";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiNetworkBars } from "react-icons/gi";

const containerStyle = {
  width: "1450px",
  height: "800px",
};

const center = {
  lat: 18.463613535289994,
  lng: 73.86820263276917,
};

function GoogleMapCustom({ devices }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUOgb-31J4ZJlTnAL3C8ek3D4N-XX8AZ4",
  });

  const [map, setMap] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      devices.forEach((device) => {
        bounds.extend(device.location);
      });
      map.fitBounds(bounds);
      setMap(map);
    },
    [devices]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (device) => {
    setSelectedDevice(device);
  };

  const handleCloseInfoWindow = () => {
    setSelectedDevice(null);
  };

  return isLoaded ? (
    <div className="flex rounded-xl overflow-hidden w-full border-2 border-gray-700 justify-center items-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        mapTypeId="satellite" // "hybrid" "roadmap" "satellite" "terrain"
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {devices.map((device) => (
          <Marker
            key={device.deviceId}
            position={device.location}
            onClick={() => handleMarkerClick(device)}
            icon={{
              url:
                device.type == "Gateway Device"
                  ? "./marker/gateway.png"
                  : "./marker/device.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}

        {selectedDevice && (
          <InfoWindow
            position={selectedDevice.location}
            onCloseClick={handleCloseInfoWindow}
          >
            <div className="p-2 ">
              <h3 className="text-sm text-gray-600 font-bold mb-2">
                Device Id : {selectedDevice.deviceId}
              </h3>
              <p className="flex justify-between mb-2">
                <span className="text-xs flex space-x-2 text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  <FaBatteryThreeQuarters className="text-green-500 text-xl mr-2" />{" "}
                  75%
                </span>
                <span className="font-bold my-auto">Battery</span>{" "}
              </p>

              <p className="flex justify-between mb-2">
                <span className="text-xs flex text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  <GiNetworkBars className="text-green-800 text-xl mr-2" />{" "}
                  Excellent
                </span>
                <span className="font-bold my-auto">Network Strength</span>{" "}
              </p>

              {selectedDevice.type !== "Gateway Device" && (
                <>
                  <p className="flex justify-between mb-2">
                    <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                      <FaDotCircle className="text-green-500 text-xl" />
                    </span>
                    <span className="font-bold my-auto">Flow meter 1</span>{" "}
                  </p>

                  <p className="flex justify-between mb-2">
                    <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                      <FaDotCircle className="text-red-500 text-xl" />
                    </span>
                    <span className="font-bold my-auto">Flow meter 2</span>{" "}
                  </p>

                  <p className="flex justify-between mb-2">
                    <span className="text-xs flex space-x-2 text-gray-900 font-semibold p-1 rounded bg-gray-200">
                      <BsSpeedometer2 className=" text-xl mr-2" /> 2.4 bar
                    </span>
                    <span className="font-bold my-auto">PT Input</span>{" "}
                  </p>

                  <p className="flex justify-between mb-2">
                    <span className="text-xs flex space-x-2 text-gray-900 font-semibold p-1 rounded bg-gray-200">
                      <BsSpeedometer2 className=" text-xl mr-2" /> 2.4 bar
                    </span>
                    <span className="font-bold my-auto">PT Output 1</span>{" "}
                  </p>

                  <p className="flex justify-between mb-2">
                    <span className="text-xs flex space-x-2 text-gray-900 font-semibold p-1 rounded bg-gray-200">
                      <BsSpeedometer2 className=" text-xl mr-2" /> 2.4 bar
                    </span>
                    <span className="font-bold my-auto">PT Output 2</span>{" "}
                  </p>

                  <div className="grid grid-cols-2 mt-4">
                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-green-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 1</span>{" "}
                    </p>

                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-green-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 2</span>{" "}
                    </p>

                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-red-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 3</span>{" "}
                    </p>

                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-green-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 4</span>{" "}
                    </p>

                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-green-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 5</span>{" "}
                    </p>

                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-red-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 6</span>{" "}
                    </p>

                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-green-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 7</span>{" "}
                    </p>

                    <p className="flex mb-2">
                      <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200 mr-2">
                        <FaDotCircle className="text-red-500 text-xl" />
                      </span>
                      <span className="font-bold my-auto">Valve 8</span>{" "}
                    </p>
                  </div>
                </>
              )}

              <div className="flex mt-4 justify-center items-center space-x-4">
                <Link
                  href={`/devices/${selectedDevice.deviceId}`}
                  type="submit"
                  id="deleteYes"
                  //   data-modal-toggle="deleteModal"
                  //   onClick={() => handleUpdateDevice()}
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 "
                >
                  view device
                </Link>

                {/* <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-gray-600 rounded hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
                >
                  Open settings
                </button> */}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapCustom);
