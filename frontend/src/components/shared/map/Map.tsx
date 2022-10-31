import './Map.scss';

import Form from '../../user/trip/form/Form';
import CalculationsBar from "../../user/trip/calculations/CalculationResultsBar";
import { Link } from "react-router-dom";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import CalculationResultsBar from '../../user/trip/calculations/CalculationResultsBar';


const center = { lat: 48.8584, lng: 2.2945 }

export default function Map() {
  const [destination, setDestination] = useState<string>("")
  const [origin, setOrigin] = useState<string>("")

  const [map, setMap] = useState<google.maps.Map | null>(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [emissions, setEmissions] = useState<number>();

  const [showResults, setShowResults] = useState<boolean>(false)


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  })

  const originRef = useRef({} as HTMLInputElement)
  const destiantionRef = useRef({} as HTMLInputElement)

  if (!isLoaded) {
    return <div>NOT LOADED YET!!</div>
  }

  async function calculateRoute(origin: string, destination: string, carMake?: string, carYear?: string, carModel?: string, consumption?: string) {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    //@ts-ignore
    setDirectionsResponse(results)
    //@ts-ignore
    const distance = results.routes[0].legs[0].distance.text

    setDistance(distance)

    let fetchBody = {}
/* 
    if(consumption === 0) {
      fetchBody = ...

    } else {
      fetchBody = ...
    }
 */
    const data = await (await fetch("http://localhost:5000/trip/calculate", {
      body: JSON.stringify(fetchBody)
    })).json()

    setEmissions(data.emissions)

    // //@ts-ignore
    // setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setEmissions(0)
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }


  return (
    <div className='container'>
      <div className='overlay-left'>
        <Form calculateRoute={calculateRoute} />
      </div>
      <div className='overlay-calculations calculations'>
        {showResults && <CalculationResultsBar emissions={emissions} distance={distance} /> }
      </div>
      <div className='background-map'>
        {/* <Box position='absolute' left={0} top={0} h='100%' w='100%'> */}
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
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
        {/* </Box> */}
      </div>

    </div>

  );
}
