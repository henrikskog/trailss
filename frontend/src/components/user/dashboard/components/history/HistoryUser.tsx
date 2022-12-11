import { createStyles, ScrollArea, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { getTripsFromDB, Trip } from '../../../../../api/newTrip';
import { formatDate, formatGrams, formatMeters, formatSeconds } from "../../../trip/calculations/utils";
import './HistoryUser.scss';

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

  const { data, isLoading, isError, error } = useQuery<Trip[], AxiosError>({
    queryKey: ['user-trips'],
    queryFn: getTripsFromDB,
    retry: false,
  });

  const showData = (rows: Trip[]) => {
    return (
      <Table verticalSpacing="sm" striped highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Distance</th>
            <th>Carbon Emissions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((trip, i) => (
            <tr key={i}>
              <td align="center">{trip.origin}</td>
              <td align="center">{trip.destination}</td>
              <td align="center">{formatDate(trip.date)}</td>
              <td align="center">{formatSeconds(trip.duration)}</td>
              <td align="center">{formatMeters(trip.distance)}</td>
              <td align="center">{formatGrams(trip.emissions)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  return (
    <div className="history-user">
      <h1>Your trips</h1>
      <div className="history-user-table">
        <ScrollArea style={{ width: '100%', height: '65vh' }}>
          {isLoading 
          ? <div>LOADING...</div> 
          : isError 
            ? <div>An error occured: <i>{error.message}</i></div>
            : showData(data) 
          }
        </ScrollArea>
      </div>
    </div>
  );
}
