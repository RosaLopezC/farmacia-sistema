import axios from 'axios';
import { AUTH_API } from '../config/api.config';

// Reemplazar la constante API
// const API = 'http://localhost:3000/api/auth';
const API = AUTH_API;

export const login = async (credentials) => {
  const res = await axios.post(`${API}/signin`, credentials);
  localStorage.setItem('user', JSON.stringify(res.data));
  return res.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API}/signup`, {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    roles: ["user"] // Por defecto, asigna rol user
  });
  return response.data;
};

export const registerByAdmin = async (userData) => {
  const response = await axios.post(`${API}/signup`, {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    roles: userData.roles // Admin puede asignar roles específicos
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};