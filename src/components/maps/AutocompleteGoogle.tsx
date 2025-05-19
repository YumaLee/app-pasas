// AutocompleteGoogle.tsx
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface AutocompleteGoogleProps {
  value: string;
  onSelectLocation: (location: { address: string; lat: number; lng: number }) => void;
  onChange: (value: string) => void;
}

export function AutocompleteGoogle({ value, onSelectLocation, onChange }: AutocompleteGoogleProps) {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value); // Sincroniza el valor con el estado del formulario
  }, [value]);

  const handlePlaceChanges = () => {
    if (!inputRef.current) return;
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const address = place.formatted_address || "";
      const location = place.geometry?.location;
      const lat = location?.lat() || 0;
      const lng = location?.lng() || 0;
      
      setInputValue(address);
      onSelectLocation({ address, lat, lng });
    }
  };

  return (
    <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChanges}>
      <Input
        value={inputValue}
        onChange={(e) => {
          const newValue = e.target.value;
          setInputValue(newValue);
          onChange(newValue);
        }}
        placeholder="Ubicación"
        autoComplete="off"
        className="bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1"
      />
    </StandaloneSearchBox>
  );
}
