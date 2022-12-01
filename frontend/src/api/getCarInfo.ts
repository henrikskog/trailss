import axios from 'axios';

const REACT_APP_API_ROOT = 'https://www.fueleconomy.gov/';

export const getCarMakes = async (modelYear: number): Promise<string[]> => {
    const response = axios.get(`${REACT_APP_API_ROOT}/ws/rest/vehicle/menu/make?year=${modelYear}`);
    return (await response).data.menuItem.map((item: any) => item.value);
};

export const getCarModels = async (modelYear: number, make: string): Promise<string[]> => {
    const response = axios.get(`${REACT_APP_API_ROOT}/ws/rest/vehicle/menu/model?year=${modelYear}&make=${make}`);
    return (await response).data.menuItem.map((item: any) => item.value);
};