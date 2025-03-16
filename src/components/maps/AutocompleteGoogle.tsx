// AutocompleteGoogle.tsx
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";
import { Input } from "@/components/ui/input";

interface AutocompleteGoogleProps {
  onSelectLocation: (location: string) => void;
}

export function AutocompleteGoogle({ onSelectLocation }: AutocompleteGoogleProps) {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const handlePlaceChanges = () => {
    if (!inputRef.current) return;
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      onSelectLocation(places[0].formatted_address || "");
    }
  };

  return (
    <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChanges}>
      <Input placeholder="Ubicación" autoComplete="off" className="bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1" />
    </StandaloneSearchBox>
  );
}
