import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/category`;

const getListCategory = () => {
    return axios.get(`${API_URL}/list`,
      {
        headers: {
          "Content-Type": "application/json",
        }
      });
  };

  const categoryService = {
    getListCategory
  };
  
  export default categoryService;