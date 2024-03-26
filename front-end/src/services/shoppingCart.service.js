import axios from "axios";
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_SERVER_URL}/shopping-cart`;

const getCart = () => {
    return axios.get(`${API_URL}`,
        {
            headers: authHeader()
        });
};


const addProductToCart = ({ productId, quantity, size, color }) => {
    return axios.post(`${API_URL}/product/${productId}/quantity/${quantity}/size/${size}/color/${color}`,
        {

        },
        {
            headers: authHeader()
        },
    );
};

const updateProductQuantityInCart = ({ productId, quantity, size, color }) => {
    return axios.put(`${API_URL}/product/${productId}/quantity/${quantity}/size/${size}/color/${color}`,
        {

        },
        {
            headers: authHeader()
        },
    );
};

const deleteProductInCart = ({ productId, size, color }) => {
    return axios.delete(`${API_URL}/product/${productId}/size/${size}/color/${color}`,
        {
            headers: authHeader()
        },
    );
};

const shoppingCartService = {
    getCart,
    addProductToCart,
    updateProductQuantityInCart,
    deleteProductInCart
};

export default shoppingCartService;
