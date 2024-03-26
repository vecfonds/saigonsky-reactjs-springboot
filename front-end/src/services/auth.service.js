import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/auth`;

const register = (username, address, phoneNumber, password) => {
  return axios.post(`${API_URL}/register`,
    {
      username, address, phoneNumber, password
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
};

const login = (phoneNumber, password) => {
  return axios
    .post(`${API_URL}/login`, {
      phoneNumber, password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  return axios.post(`${API_URL}/logout`,
      {
      },
      {
          headers: authHeader()
      },
  );
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
