import { createContext, useState, useContext } from 'react';
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const addToCart = async ({ cartId, inventoryId, quantity, userId, createUser }) => {
        try {
            const payload = {
                cartId,
                inventoryId,
                quantity,
                userId,
                createUser,
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

    return (
        <CartContext.Provider value={{ cartItems, addToCart, error }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => {
    return useContext(CartContext);
};