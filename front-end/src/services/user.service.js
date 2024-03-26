import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/user`;

const getUser = () => {
    return axios.get(`${API_URL}`,
        {
            headers: authHeader()
        });
};

const updateUser = ({ username, address, phoneNumber }) => {
    return axios.put(`${API_URL}`,
        {
            username, address, phoneNumber
        },
        {
            headers: authHeader()
        },
    );
};

const changePassword = ({ currentPassword, newPassword, confirmationPassword }) => {
    return axios.put(`${API_URL}/change-password`,
        {
            currentPassword, newPassword, confirmationPassword
        },
        {
            headers: authHeader()
        },
    );
};

const userService = {
    getUser,
    updateUser,
    changePassword
};

export default userService;

