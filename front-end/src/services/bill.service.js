import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/bill`;

const getListBillUser = ({ pageNumber}) => {
    return axios.get(`${API_URL}/user/list?pageNumber=${pageNumber}`,
        {
            headers: authHeader()
        });
};

const addBill = ({ payMethod }) => {
    return axios.post(`${API_URL}/payMethod/${payMethod}`,
        {
        },
        {
            headers: authHeader()
        },
    );
};

const billService = {
    getListBillUser,
    addBill
};

export default billService;

