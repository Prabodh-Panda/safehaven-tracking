"use client";

import { useState, useEffect } from "react";
import Map from "@/components/Map";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface Location {
  latitude: number;
  longitude: number;
}

const LocationPage = () => {
  const searchParams = useSearchParams();
  const tracking_id = searchParams.get("tracking_id");

  const [location, setLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error);
            setError("Error fetching current location");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!tracking_id) return;
      setLoading(true);

      axios
        .get(`/api/getLocation?tracking_id=${tracking_id}`)
        .then((response) => {
          setLocation({
            latitude: response.data.last_latitude,
            longitude: response.data.last_longitude,
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchLocation();
  }, [tracking_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Location for Tracking ID: {tracking_id}</h1>
      {location && (
        <div>
          <Map userLocation={userLocation} trackingLocation={location} />
        </div>
      )}
    </div>
  );
};

export default LocationPage;
