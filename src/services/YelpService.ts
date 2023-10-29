import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://api.yelp.com/v3/businesses';
const BEARER_TOKEN = 'Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/' + BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function getBusinesses(searchLocation: string): Promise<any> {
  try {
    const response: AxiosResponse = await axiosInstance.get('/search', {
      params: {
        location: searchLocation,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error;
  }
}

async function getBusinessDetail(idOrAlias: string): Promise<any> {
  try {
    const response: AxiosResponse = await axiosInstance.get(`/${idOrAlias}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching business detail:', error);
    throw error;
  }
}

export default {
  getBusinesses,
  getBusinessDetail,
};
