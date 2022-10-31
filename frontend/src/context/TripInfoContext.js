import React, { useState } from "react";

const TripInfoContext = React.createContext({
    tripInfo: {
        origin: 'Albalat de la Ribera', 
        destination: 'Poliña del Xuquer', 
        date: 0, 
        passengers: 1, 
        carYear: 2000, 
        consumption: 69
    }, 
    setTripInfo: () => {}
});

export default TripInfoContext