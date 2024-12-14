// components/Map.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MapProps {
  userLocation: { latitude: number; longitude: number } | null;
  trackingLocation: { latitude: number; longitude: number } | null;
}

const Map = ({ userLocation, trackingLocation }: MapProps) => {
  const userPosition: LatLngExpression = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [0, 0];

  const trackingPosition: LatLngExpression = trackingLocation
    ? [trackingLocation.latitude, trackingLocation.longitude]
    : [0, 0];

  console.log(userLocation, trackingLocation);

  return (
    <MapContainer
      center={userPosition}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {userLocation && (
        <Marker position={userPosition}>
          <Popup>
            <span>Your current location</span>
          </Popup>
        </Marker>
      )}

      {trackingLocation && (
        <Marker position={trackingPosition}>
          <Popup>
            <span>
              Tracking location: {trackingLocation.latitude},{" "}
              {trackingLocation.longitude}
            </span>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
