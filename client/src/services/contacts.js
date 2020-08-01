import axios from 'axios';

const baseUrl = '/api/contacts';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addNew = async (object) => {
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const deleteContact = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const addLink = async (id, object) => {
  const response = await axios.post(`${baseUrl}/${id}/url`, object);
  return response.data;
};

const editLink = async (id, urlId, object) => {
  const response = await axios.patch(`${baseUrl}/${id}/url/${urlId}`, object);
  return response.data;
};

const deleteLink = async (id, urlId) => {
  const response = await axios.delete(`${baseUrl}/${id}/url/${urlId}`);
  return response.data;
};

export default {
  getAll,
  addNew,
  deleteContact,
  addLink,
  editLink,
  deleteLink,
};
