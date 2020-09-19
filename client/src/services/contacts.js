import axios from 'axios';
import backendUrl from '../backendUrl';

const baseUrl = `${backendUrl}/api/contacts`;

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl, setConfig());
  return response.data;
};

const addNew = async (contactObj) => {
  const response = await axios.post(baseUrl, contactObj, setConfig());
  return response.data;
};

const deleteContact = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig());
  return response.data;
};

const editContact = async (id, contactObj) => {
  const response = await axios.patch(
    `${baseUrl}/${id}/name_dp`,
    contactObj,
    setConfig()
  );
  return response.data;
};

const addLink = async (id, linkObj) => {
  const response = await axios.post(
    `${baseUrl}/${id}/url`,
    linkObj,
    setConfig()
  );
  return response.data;
};

const editLink = async (id, urlId, linkObj) => {
  const response = await axios.patch(
    `${baseUrl}/${id}/url/${urlId}`,
    linkObj,
    setConfig()
  );
  return response.data;
};

const deleteLink = async (id, urlId) => {
  const response = await axios.delete(
    `${baseUrl}/${id}/url/${urlId}`,
    setConfig()
  );
  return response.data;
};

export default {
  setToken,
  getAll,
  addNew,
  deleteContact,
  editContact,
  addLink,
  editLink,
  deleteLink,
};
