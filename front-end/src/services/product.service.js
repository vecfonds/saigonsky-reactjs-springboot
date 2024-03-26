import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/product`;

const getProduct = ({ productId }) => {
  return axios.get(`${API_URL}/${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
};

const getListProduct = ({ pageNumber, pageSize, sortBy, sortOrder }) => {
  return axios.get(`${API_URL}/list?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
};

const getListProductByCategory = ({ pageNumber, pageSize, sortBy, sortOrder, categoryId }) => {
  return axios.get(`${API_URL}/list/category/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
};

const getListProductByKeyword = ({ pageNumber, pageSize, sortBy, sortOrder, keyword }) => {
  return axios.get(`${API_URL}/list/keyword/${keyword}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    {
      headers: {
        "Content-Type": "application/json",
      }
    });
};


const productService = {
  getProduct,
  getListProduct,
  getListProductByCategory,
  getListProductByKeyword
};

export default productService;
