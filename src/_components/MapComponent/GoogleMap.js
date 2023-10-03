"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF as InfoWindow,
  MarkerF as Marker,
  useLoadScript,
  // MarkerClustererF as MarkerClusterer,
} from "@react-google-maps/api";

function MapGoogle({ data }) {
  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey, // Add your API key
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    data.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return isLoaded ? (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "50vh" }}
      zoom={8}
    >
      {data.map(
        ({
          id,
          name,
          position,
          status,
          connectivity,
          pv_energy_usage,
          grid_energy_usage,
          total_energy_usage,
        }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <p className="border-b-2 border-black mb-2">{name}</p>
                  <div className="min-w-full border-black border-4 mt-2"></div>
                  <p className="mt-2">
                    Status: {status === "Active" ? "🟢" : "🔴"}
                  </p>
                  <p>Via: {connectivity}</p>
                  <p>Pv: {pv_energy_usage} kWh</p>
                  <p>Grid: {grid_energy_usage} kWh</p>
                  <p>Total: {total_energy_usage} kWh</p>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        )
      )}
    </GoogleMap>
  ) : null;
}

export default MapGoogle;
