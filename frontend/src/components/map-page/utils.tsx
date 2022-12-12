import { showNotification } from "@mantine/notifications";

export const showGoogleMapsError = (msg: string = 'Please try again later') => showNotification({
        title: 'There occured an error with Google Maps',
        message: msg,
        color: 'red',
      });