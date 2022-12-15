import axios from 'axios';

// Add a request interceptor
export const setAxiosAuthToken = (token: string) => {
  console.log('setting axios auth token');
  axios.interceptors.request.use((config) => {
    const backendApiRoot = process.env.REACT_APP_API_ROOT || 'localhost:5000';

    if (config.url?.includes(backendApiRoot)) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

export const removeAxiosAuthToken = () => {
  axios.interceptors.request.clear();
};
