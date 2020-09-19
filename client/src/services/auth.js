import axios from 'axios';
import backendUrl from '../backendUrl';

const login = async (credentials) => {
  const response = await axios.post(`${backendUrl}/api/login`, credentials);
  return response.data;
};

const register = async (enteredData) => {
  const response = await axios.post(`${backendUrl}/api/register`, enteredData);
  return response.data;
};

export default { login, register };
