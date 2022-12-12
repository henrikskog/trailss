
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

// Convert from grams to kilograms, round to 0 decimal place, add 'kg' to the end and add points to separate thousands. If under a kilo, just show grams.
export const formatGrams = (emissions: number) => {
  console.log(emissions)
  const kg = Math.floor(emissions / 1000);
  const grams = emissions % 1000;
  const kgString = kg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const gramsString = grams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (kg > 0) {
    return `${kgString}kg`;
  } else {
    return `${gramsString}g`;
  } 
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
};
