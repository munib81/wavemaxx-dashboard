import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

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

  // roadmap : Displays the normal, default 2D tiles of Google Maps.
  // satellite : Displays satellite images
  // hybrid : Displays a photographic map + roads and city names.
  // terrain : Displays a physical map based on terrain information.

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
            icon={{
              url:
                device.status == "active"
                  ? "https://imgs.search.brave.com/pJI_aRgYeYY1UZBWoRRh2QCz8wtIFd60RrBoPiPWzfY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS81V2lmT1dSczAw/LXNDTnhDdkZOSjIy/ZDR4Z19OUWtBT0Rq/bU9LdUNRcWU1N1Nq/bUR3OFM2Vk9TTGtx/bzZmczR6cWlzPXcy/NDAtaDQ4MC1ydw"
                  : "https://w7.pngwing.com/pngs/825/135/png-transparent-red-location-icon-google-maps-pin-google-map-maker-google-s-heart-map-location-thumbnail.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapCustom);
