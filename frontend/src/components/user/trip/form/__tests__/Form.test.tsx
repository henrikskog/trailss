import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import renderer from 'react-test-renderer';

import Form, { Props } from "../Form";
import Map from "../../../../shared/map/Map";

it('Should return emissions from the API ', () => {
    //API call
    const calculateRoute = jest.fn();
    render(
        <Form calculateRoute={calculateRoute} />        
    );
    const originInput = screen.getByLabelText('Origin:')
    const destinationInput = screen.getByLabelText('Destination:')
    const dateInput = screen.getByLabelText('Event date')
    const passengersInput = screen.getByLabelText('Num. Passengers:')
    const carYearInput = screen.getByLabelText('Car Year')
    const consumptionInput = screen.getByLabelText('Consumption')
    const submitButton = screen.getByText('Submit')
    
    //fill in form
    fireEvent.change(originInput, { target: { value: 'Times Square' } })
    fireEvent.change(destinationInput, { target: { value: 'Vegas' } })
    fireEvent.change(dateInput, { target: { value: '2021-05-05' } })
    fireEvent.change(passengersInput, { target: { value: '1' } })
    fireEvent.change(carYearInput, { target: { value: '2020' } })
    fireEvent.change(consumptionInput, { target: { value: '10' } })
    
    //submit data
    fireEvent.click(submitButton)
        
    //check if emissions are displayed
    const emissions = screen.getByText('Emissions')   

    expect(emissions).toBeInTheDocument()

});

it('Should load a blank form', () => {
    const calculateRoute = jest.fn();
    render(
        <Form calculateRoute={calculateRoute} />        
    );
    //get inputs from the form
    const originInput = screen.getByLabelText('Origin:') as HTMLInputElement
    const destinationInput = screen.getByLabelText('Destination:') as HTMLInputElement
    const dateInput = screen.getByLabelText('Event date') as HTMLInputElement
    const passengersInput = screen.getByLabelText('Num. Passengers:') as HTMLInputElement
    const carYearInput = screen.getByLabelText('Car Year') as HTMLInputElement
    const consumptionInput = screen.getByLabelText('Consumption') as HTMLInputElement

    //get values from the form
    expect(originInput.value).toBe('')
    expect(destinationInput.value).toBe('')
    expect(dateInput.value).toBe('')
    expect(passengersInput.value).toBe('')
    expect(carYearInput.value).toBe('')
    expect(consumptionInput.value).toBe('')
});
    
