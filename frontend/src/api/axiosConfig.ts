import axios from 'axios';

// Add a request interceptor
export const setAxiosAuthToken = (token: string) => {
  console.log('setting axios auth token');
  axios.interceptors.request.use((config) => {
    if (config.url?.includes('localhost')) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};

export const removeAxiosAuthToken = () => {
  axios.interceptors.request.clear();
};
