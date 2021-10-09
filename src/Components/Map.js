import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Marker,
  Popup,
} from "react-leaflet";
import "../Styles/Map.css";
import { showDataOnMap } from "../Utils/util";

function Map({ countries, casesType, center, zoom }) {
  const [map, setMap] = useState(null);
  if (map) {
    map.flyTo(center);
  }
  return (
    <div className="map">
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={true}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/** Loop through countries and draw circle */}
        {countries.map((country) => (
          <CircleMarker
            center={[country.countryInfo.lat, country.countryInfo.long]}
            radius={Math.sqrt(Math.sqrt(country.cases))}
            fillOpacity={0.4}
            fillColor={"#CC1034"}
            color={"#CC1034"}
          >
            <Popup>
              <h1>I'm popup</h1>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
