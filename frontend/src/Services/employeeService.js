import axios from "axios";

const API_URL = "http://localhost:5000";

export const getEmployees = () =>
  axios.get(`${API_URL}/employees`);

export const createEmployee = (data) =>
  axios.post(`${API_URL}/employees`, data);

export const updateEmployee = (id, data) =>
  axios.put(`${API_URL}/employees/${id}`, data);

export const deleteEmployee = (id) =>
  axios.delete(`${API_URL}/employees/${id}`);
