
export const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return `${hours}h ${minutes}m ${secondsLeft}s`;
};

export const formatMeters = (meters: number) => {
  const km = Math.floor(meters / 1000);
  const metersLeft = meters % 1000;
  return `${km}km ${metersLeft}m`;
};

export const formatEmissions = (emissions: number) => {
  return `${emissions.toFixed(0)}g`;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
};
