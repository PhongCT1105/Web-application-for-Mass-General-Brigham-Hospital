import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapChart = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <div style={{ position: "relative" }}>
        <img
          src="apps/frontend/src/assets/lower-level-map.png"
          alt="Your Image"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </div>
    </MapContainer>
  );
};

export default MapChart;
