import axios from "axios";

const API_URL = "http://localhost:3000/api/ordenes";

export const getOrdenes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getOrdenById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createOrden = async (ordenData) => {
  const res = await axios.post(API_URL, ordenData);
  return res.data;
};

export const updateOrden = async (id, ordenData) => {
  const res = await axios.put(`${API_URL}/${id}`, ordenData);
  return res.data;
};

export const deleteOrden = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
