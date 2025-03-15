
import { useRef } from 'react'
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";

const GOOGLE_MAPS_API_KEY = "AIzaSyCJw95Ci1CUQKejVjZ1FxDbQKDc6MyAMdI"; // Reemplázalo con tu clave de API

export function AutocompleteGoogle() {



    const inputRef = useRef<google.maps.places.SearchBox | null>(null);

    const handlePlaceChanges = () => {
        if (!inputRef.current) return; // Verifica que no sea null antes de acceder 
        const places = inputRef.current.getPlaces();
        console.log(places);
    }

    return (
        <div>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
                <StandaloneSearchBox
                    onLoad={(ref) => inputRef.current = ref}
                    onPlacesChanged={handlePlaceChanges}
                >
                    <Input
                        placeholder="Location"
                        autoComplete="off"
                        className="bg-transparent border-none focus-visible:ring-2 text-white/90 placeholder:text-white/50 h-auto p-1"
                    />
                </StandaloneSearchBox>
            </LoadScript>
        </div>

    );
}