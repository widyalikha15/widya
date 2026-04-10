import axios from "axios";

const API_URL = "http://localhost:5000";

export const getPositions = () =>
  axios.get(`${API_URL}/positions`);