import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

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
        zoom={5}
        mapTypeId="satellite"
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
                device.status === "active"
                  ? "https://imgs.search.brave.com/pJI_aRgYeYY1UZBWoRRh2QCz8wtIFd60RrBoPiPWzfY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS81V2lmT1dSczAw/LXNDTnhDdkZOSjIy/ZDR4Z19OUWtBT0Rq/bU9LdUNRcWU1N1Nq/bUR3OFM2Vk9TTGtx/bzZmczR6cWlzPXcy/NDAtaDQ4MC1ydw"
                  : "https://w7.pngwing.com/pngs/825/135/png-transparent-red-location-icon-google-maps-pin-google-map-maker-google-s-heart-map-location-thumbnail.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}

        {selectedDevice && (
          <InfoWindow
            position={selectedDevice.location}
            onCloseClick={handleCloseInfoWindow}
          >
            <div className="p-4">
              {/* <h3 className="text-xl font-bold mb-2">{selectedDevice.name}</h3>
              <img
                src={selectedDevice.image} // Replace with the appropriate image URL field
                alt={selectedDevice.name}
                className="mb-4 rounded-lg"
                style={{ maxWidth: "100%" }}
              /> */}
              <p>
                <span className="font-bold">Device ID:</span>{" "}
                {selectedDevice.deviceId}
              </p>
              <p>
                <span className="font-bold">Location:</span>{" "}
                {`(${selectedDevice.location.lat}, ${selectedDevice.location.lng})`}
              </p>
              <p>
                <span className="font-bold">RTU ID:</span>{" "}
                {selectedDevice.rtuId}
              </p>
              <p>
                <span className="font-bold">Central ID:</span>{" "}
                {selectedDevice.centralId}
              </p>
              <p>
                <span className="font-bold">Type:</span> {selectedDevice.type}
              </p>
              <p>
                <span className="font-bold">Status:</span>{" "}
                {selectedDevice.status}
              </p>
              <p>
                <span className="font-bold">Logs:</span>{" "}
                {selectedDevice.logs.map((log, index) => (
                  <span key={index}>{log} </span>
                ))}
              </p>
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
