import { Button, Container, Group, ScrollArea, Table } from "@mantine/core";
import './Fleets.scss';

export default function Fleets() {

    // ToDo: replace by database access?
    // ToDo: think about better table header names
    const cars = [
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},
        { model: "BMW", year: "2012", origin: "Valencia", destination: 'Madrid', emissions: "200g", duration: "30min", identifier: ""},

      ];

      const rows = cars.map((car) => (
        <tr key={car.identifier}>
          <td>{car.model}</td>
          <td>{car.year}</td>
          <td>{car.origin}</td>
          <td>{car.destination}</td>
          <td>{car.duration}</td>
          <td>{car.emissions}</td>
        </tr>
      ));



    // REQUIREMENTS: 
    // the idea was to have on the left side the table, containing all the registered cars
    // on the right side we have the editor. Clicking on any car in the table opens the car in the editor
    // and the car be modified from there. Maybe it should allow for adding stops beside the origin/destination as well
    // maybe below the Editor have the option of adding new cars by clicking on a button

    return (<div>
        <Group>
            <div className="table">
                <h2>Registered cars</h2>
                <ScrollArea style={{ width: "100%", height: "100vh" }}>
                    <Table verticalSpacing="sm" striped highlightOnHover>
                        <thead>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Duration</th>
                            <th>Carbon Emissions</th>
                            <th></th>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </div>
            <div className="editor">
                Future editor
                <Button className="newCarButton">
                    Add a new car
                </Button>
            </div>
        </Group>
    </div>);
}