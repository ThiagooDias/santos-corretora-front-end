import {
  useLoadScript,
  GoogleMap,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import { Search } from "lucide-react"; // Ícone de busca do Lucide

const mapContainerStyle = { width: "100%", height: "400px" };
const center = { lat: -2.994320343345051, lng: -47.35867856655007 }; // Paragominas

export function MapPicker({ onLocationSelect, className }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY_MAPS,
    libraries: ["places"],
  });

  const [selectedLocation, setSelectedLocation] = useState(center);
  const autocompleteRef = useRef(null);

  if (!isLoaded) return <p>Carregando mapa...</p>;

  const handleMapClick = (event) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const newLocation = { lat, lng };
      setSelectedLocation(newLocation);
      onLocationSelect?.(newLocation); // Passa a nova localização para o pai
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const newLocation = { lat, lng };
      setSelectedLocation(newLocation);
      onLocationSelect?.(newLocation);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-80 bg-white shadow-lg rounded-lg flex items-center px-3 py-2">
        <Search className="text-gray-500 mr-2" size={20} />
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect}>
          <input
            type="text"
            placeholder="Digite um endereço..."
            className="w-full outline-none text-gray-700"
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={selectedLocation}
        onClick={handleMapClick}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>
    </div>
  );
}