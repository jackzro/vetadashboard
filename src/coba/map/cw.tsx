"use client";

import { useState, useCallback } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { data } from "../../data/tree";
import SuperClusterAlgorithm from "../../utils/superClusterAlgorithm";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

const mapOptions = {
  zoom: 12,
  center: {
    lat: 43.68,
    lng: -79.43,
  },
};

interface Position {
  lat?: number;
  lng?: number;
}

const addMarkers = (map: any) => {
  const infoWindow = new google.maps.InfoWindow();

  const markers = data.map(([name, lat, lng]: any) => {
    const position: Position = { lat, lng };
    const marker = new google.maps.Marker({ position: { lat, lng } });

    marker.addListener("click", () => {
      infoWindow.setPosition({ lat, lng });
      infoWindow.setContent(`
        <div class="info-window">
          <h2>${name}</h2>
        </div>
      `);
      infoWindow.open({ map });
    });

    return marker;
  });

  new MarkerClusterer({
    markers,
    map,
    algorithm: new SuperClusterAlgorithm({ radius: 200 }),
  });
};

const Map = () => {
  const [mapContainer, setMapContainer] = useState(null);
  const onLoad = useCallback((map: any) => addMarkers(map), []);
  const googleKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: googleKey,
  //   // libraries: ["places"],
  // });

  // if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      {/* <div>
        <PlacesAutocomplete />
      </div> */}

      <GoogleMapsProvider
        googleMapsAPIKey={googleKey}
        mapOptions={mapOptions}
        mapContainer={mapContainer}
        onLoadMap={onLoad}
      >
        <div
          ref={(node: any) => setMapContainer(node)}
          style={{ height: "50vh" }}
        />
      </GoogleMapsProvider>
    </>
  );
};

export default Map;

// const PlacesAutocomplete = () => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   return (
//     <>
//       <input
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className="text-xl border-red-700 w-32"
//         placeholder="Search the address"
//         // disabled={!ready}
//       ></input>
//       {status === "OK" && (
//         <ul>
//           {data.map(({ place_id, description }) => (
//             <li key={place_id}>{description}</li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// };
