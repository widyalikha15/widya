import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchUsers = async (token) => {
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeUser = async (id, token) => {
  return axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};