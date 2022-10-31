import React, { useState } from "react";

const TripInfoContext = React.createContext({
    tripInfo: {
        origin: '', 
        destination: '', 
        date: 0, 
        passengers: 1, 
        carYear: 2000, 
        consumption: 0
    }, 
    setTripInfo: () => {}
});

export default TripInfoContext