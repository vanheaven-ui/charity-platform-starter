"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

export const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  center,
  zoom = 15,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", 
  });

  if (loadError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-red-100 text-red-700 rounded-lg">
        Error loading map: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 rounded-lg">
        Loading Map...
      </div>
    );
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      <Marker position={center} />
    </GoogleMap>
  );
};