import axios from "axios";
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_SERVER_URL}/favourite`;

const getFavourite = () => {
    return axios.get(`${API_URL}`,
        {
            headers: authHeader()
        });
};


const addProductToFavourite = ({ productId}) => {
    return axios.post(`${API_URL}/product/${productId}`,
        {

        },
        {
            headers: authHeader()
        },
    );
};


const deleteProductInFavourite = ({ productId }) => {
    return axios.delete(`${API_URL}/product/${productId}`,
        {
            headers: authHeader()
        },
    );
};

const favouriteService = {
    getFavourite,
    addProductToFavourite,
    deleteProductInFavourite
};

export default favouriteService;