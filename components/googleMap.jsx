import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Link from "next/link";

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
            key={device._id}
            position={device.location}
            onClick={() => handleMarkerClick(device)}
            icon={{
              url:
                device.type == "Gateway Device"
                  ? "./marker/gateway.png"
                  : "https://images.ctfassets.net/o7xu9whrs0u9/1mpMDYVC8k7iFgFzM99SnS/c2dfa0df9cb6d6c8643c60b0657326fe/technology-hl.svg",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}

        {selectedDevice && (
          <InfoWindow
            position={selectedDevice.location}
            onCloseClick={handleCloseInfoWindow}
          >
            <div className="p-2 py-4">
              {/* <h3 className="text-xl font-bold mb-2">{selectedDevice.name}</h3>
              <img
                src={selectedDevice.image} // Replace with the appropriate image URL field
                alt={selectedDevice.name}
                className="mb-4 rounded"
                style={{ maxWidth: "100%" }}
              /> */}
              <p className="flex justify-between mb-2">
                <span className="font-bold">Device ID:</span>{" "}
                <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  {selectedDevice.deviceId}
                </span>
              </p>
              <p className="flex justify-between mb-2">
                <span className="font-bold mr-4">Location:</span>{" "}
                <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  {`(${selectedDevice.location.lat}, ${selectedDevice.location.lng})`}
                </span>
              </p>
              <p className="flex justify-between mb-2">
                <span className="font-bold">RTU ID:</span>{" "}
                <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  {selectedDevice.rtuId}
                </span>
              </p>
              <p className="flex justify-between mb-2">
                <span className="font-bold">Gateway ID:</span>{" "}
                <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  {selectedDevice.GatewayId}
                </span>
              </p>
              <p className="flex justify-between mb-2">
                <span className="font-bold">Type:</span>
                <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  {selectedDevice.type}
                </span>
              </p>
              <p className="flex justify-between mb-2">
                <span className="font-bold">Status:</span>{" "}
                <span className="text-xs text-gray-900 font-semibold p-1 rounded bg-gray-200">
                  {selectedDevice.status}
                </span>
              </p>
              <p className="flex justify-between ">
                <span className="font-bold">Logs:</span>{" "}
                {selectedDevice.logs.map((log, index) => (
                  <span key={index}>{log} </span>
                ))}
              </p>
              <div className="flex mt-4 justify-center items-center space-x-4">
                <Link
                  href={`/devices/${selectedDevice._id}`}
                  type="submit"
                  id="deleteYes"
                  //   data-modal-toggle="deleteModal"
                  //   onClick={() => handleUpdateDevice()}
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 "
                >
                  open settings
                </Link>
                <button
                  //   data-modal-toggle="deleteModal"
                  // onClick={() => handleDeleteDevice()}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
                >
                  mark as inactive
                </button>
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
