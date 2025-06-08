import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import useAuth  from '../hooks/useAuth';

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const { isAuthenticated, userData  } = useAuth();
    const navigate = useNavigate();

    const addToCart = async ({ cartId, inventoryId, quantity }) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const payload = {
                cartId,
                inventoryId,
                quantity,
                userId: userData.userId,
                createUser: userData.createUser,
            };
            const base64Payload = btoa(JSON.stringify(payload));
            const response = await axios.post('http://localhost:8082/carts/addToCart', base64Payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const base64Data = response.data;
            const jsonString = atob(base64Data);
            const data = JSON.parse(jsonString);

            setCartItems(data.cartItems);
        } catch (error) {
            console.error('Error en addToCart:', error);
            setError('Error al agregar el producto al carrito');
        }
    };

    return {
        cartItems,
        addToCart,
        error,
    };
};

export default useCart;
