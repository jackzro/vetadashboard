"use client";

import React, { useState } from "react";
import {
  InfoWindowF as InfoWindow,
  MarkerF as Marker,
} from "@react-google-maps/api";

function LocationMarker({ location, clusterer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mapMarker, setMapMarker] = useState(null);

  const openToggle = () => {
    setIsOpen(!isOpen);
  };

  const onLoad = (mapMarker) => {
    setMapMarker(mapMarker);
  };
  return (
    <Marker position={location} onLoad={onLoad} onClick={openToggle}>
      {isOpen && (
        <InfoWindow anchor={mapMarker} position={location} onClose={openToggle}>
          <div>
            coba
            {/* <h3>{this.props.location.name}</h3>
            <p>{this.props.location.address}</p>
            <ul>
              {this.props.location.exposureEvents.map(
                (exposureEvent, index) => (
                  <li key={index}>
                    {exposureEvent.day} - {exposureEvent.times}
                  </li>
                )
              )}
            </ul> */}
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export default LocationMarker;
