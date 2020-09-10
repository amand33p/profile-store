import axios from 'axios';

const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials);
  return response.data;
};

const register = async (enteredData) => {
  const response = await axios.post('/api/register', enteredData);
  return response.data;
};

export default { login, register };
