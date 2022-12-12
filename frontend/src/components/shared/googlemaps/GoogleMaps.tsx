import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const center = { lat: 48.8584, lng: 2.2945 };

interface Props {
  directionsResponse: google.maps.DirectionsResult | undefined;
}


const library = 'places'

const libraries: ("places")[] = [library];

const GoogleMaps: React.FC<Props> = ({ directionsResponse }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries
  });

  if (!isLoaded) {
    return <div>NOT LOADED YET!!</div>;
  }

  return (
    <>
      {/* Google Map Box */}
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </>
  );
};

export default GoogleMaps;
