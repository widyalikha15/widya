import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const refreshToken = async (navigate) => {
  try {
    const response = await axios.get("http://localhost:5000/token");
    const decoded = jwtDecode(response.data.accessToken);

    return {
      success: true,
      user: {
        userId: decoded.userId,
        name: decoded.name,
        email: decoded.email,
      },
      token: response.data.accessToken,
    };
  } catch (error) {
    navigate("/");
    return {
      success: false,
      user: null,
      token: null,
    };
  }
};

export const logoutUser = async (navigate) => {
  try {
    await axios.delete("http://localhost:5000/logout");
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};