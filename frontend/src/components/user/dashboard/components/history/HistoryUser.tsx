import { createStyles, ScrollArea, Table } from '@mantine/core';
import { useState } from 'react';
import './HistoryUser.scss';

const trips = [
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" },
    { origin: "Casa", destination: "UPV", duration: '30min', date: "30/10/2022", distance: "5km", emissions: "500g" }
];

const useStyles = createStyles((theme) => ({
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease',
  
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
      },
    },
  
    scrolled: {
      boxShadow: theme.shadows.sm,
    },
  }));

export default function HistoryUser() {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = trips.map((element) =>
        <tr>
            <td align="center">{element.origin}</td>
            <td align="center">{element.destination}</td>
            <td align="center">{element.date}</td>
            <td align="center">{element.duration}</td>
            <td align="center">{element.distance}</td>
            <td align="center">{element.emissions}</td>
        </tr>
    );
    return (
        <div className="history-user">
            <h1>Your trips</h1>
            <div className='history-user-table'>
            <ScrollArea style={{ width: "100%", height: "65vh" }}>
                <Table verticalSpacing="sm" striped highlightOnHover>
                    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Distance</th>
                        <th>Carbon Emissions</th>
                        <th></th>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            </div>
        </div>
    );
}