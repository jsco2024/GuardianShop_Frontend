import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Global } from '../helpers/Global';
import { jwtDecode } from 'jwt-decode';

const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [error, setError] = useState(null);

  const isTokenValid = (token) => {
    try {
      if (token.split(".").length !== 3) {
        return false;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp >= currentTime;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return false;
    }
  };

  const checkIfUserHasCart = async (userId) => {
    const token = localStorage.getItem("authToken");
    if (!token || !isTokenValid(token)) {
      console.error("Token no disponible o inválido");
      return 0;
    }

    try {
      const cartCheckPayload = { userId };
      const base64Payload = btoa(JSON.stringify(cartCheckPayload));

      const response = await axios.post(
        Global.url + "carts/findCartByUser",
        base64Payload,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const base64Response = response.data;
      const decodedString = atob(base64Response);
      const parsedResponse = JSON.parse(decodedString);
      const innerData = parsedResponse?.data;
      const innerParsedData = JSON.parse(innerData);

      return innerParsedData.cartId || 0;
    } catch (error) {
      console.error("Error en checkIfUserHasCart:", error);
      setError("Error al verificar el carrito");
      return 0;
    }
  };

  const addToCartHandler = async (product) => {
    const token = localStorage.getItem("authToken");

    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = parseInt(decodedToken.sub);
      const usernamePayload = { id: userId };
      const base64UsernamePayload = btoa(JSON.stringify(usernamePayload));

      const userNameResponse = await axios.post(
        Global.url + "users/list/id",
        base64UsernamePayload,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userNameData = JSON.parse(atob(userNameResponse.data));
      const { userName } = userNameData.data;
      const cartId = await checkIfUserHasCart(userId);

      const cartPayload = {
        cartId,
        inventoryId: product.inventoryId,
        quantity: 1,
        userId,
        createUser: userName,
      };

      const base64CartPayload = btoa(JSON.stringify(cartPayload));

      const response = await axios.post(
        Global.url + "carts/addToCart",
        base64CartPayload,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const base64Data = response.data;
      if (base64Data && base64Data.length % 4 === 0) {
        const jsonString = atob(base64Data);
        const data = JSON.parse(jsonString);
        dispatch(updateCart(data.cartItems));
      } else {
        console.error("Invalid Base64 string:", base64Data);
        setError("Invalid data format from server");
      }
    } catch (error) {
      console.error("Error en addToCart:", error);
      setError("Error al agregar el producto al carrito");
    }
  };

  const validateCart = async (currentPage = 1) => { 
    const token = localStorage.getItem("authToken");
  
    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return { success: false, items: [] };
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const userId = parseInt(decodedToken.sub);
      const usernamePayload = { id: userId };
      const base64UsernamePayload = btoa(JSON.stringify(usernamePayload));
  
      const userNameResponse = await fetch(Global.url + "users/list/id", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: base64UsernamePayload,
      });
  
      if (!userNameResponse.ok) {
        throw new Error(`Error en la respuesta del servidor: ${userNameResponse.status}`);
      }
  
      const userNameBase64Data = await userNameResponse.text();
      const userNameData = JSON.parse(atob(userNameBase64Data));
      const { userName } = userNameData.data;
  
      const cartId = await checkIfUserHasCart(userId);
      if (cartId === 0) {
        console.error("No se encontró el carrito del usuario.");
        return { success: false, items: [] };
      }
  
      const cartValidationPayload = {
        cartId,
        createUser: userName,
      };
  
      const cartValidationResponse = await fetch(
        Global.url + "order-items/validate/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartValidationPayload),
        }
      );
  
      if (!cartValidationResponse.ok) {
        throw new Error(`Error en la respuesta del servidor: ${cartValidationResponse.status}`);
      }
  
      const base64Data = await cartValidationResponse.text();
      const jsonString = atob(base64Data);
      const data = JSON.parse(jsonString);
  
      if (data.data === true) {
        const payload = {
          cartId,
          page: currentPage,
          size: 10,
        };
  
        const orderItemsResponse = await fetch(Global.url + "order-items/list/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!orderItemsResponse.ok) {
          throw new Error(`Error en la respuesta del servidor: ${orderItemsResponse.status}`);
        }
  
        const orderItemsBase64Data = await orderItemsResponse.text();
        const jsonString = atob(orderItemsBase64Data);
        const dataString = JSON.parse(jsonString);
        if (dataString.data) {
          const items = dataString.data;
          dispatch(updateCart(items));
          return { success: true, items };
        }
      }
    } catch (error) {
      console.error("Error en validateCart:", error);
      setError("Error al validar el carrito");
    }
  };

  const updateItemQuantity = async (item) => {
    const token = localStorage.getItem("authToken");
  
    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return;
    }
  
    try {
      const orderItemDto = {
        id: item.id,
        name: item.name,
        cartId: item.cartId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        updateUser: item.userName,
      };
  
      const base64OrderItemDto = btoa(JSON.stringify(orderItemDto));
  
      const response = await axios.post(
        Global.url + "order-items/updateRecord",
        base64OrderItemDto,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const base64Data = response.data;
      if (base64Data && base64Data.length % 4 === 0) {
        const jsonString = atob(base64Data);
        const updatedItem = JSON.parse(jsonString);
  
        const updatedItems = cartItems.content.map((cartItem) =>
          cartItem.id === updatedItem.data.id
            ? { ...cartItem, quantity: updatedItem.data.quantity }
            : cartItem
        ).filter((cartItem) => cartItem.quantity > 0);
        
        
        dispatch(updateCart({ ...cartItems, content: updatedItems }));
      } else {
        console.error("Invalid Base64 string:", base64Data);
        setError("Invalid data format from server");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
      setError("Error al actualizar la cantidad del ítem");
    }
  };

  return {
    cartItems,
    addToCart: addToCartHandler,
    validateCart,
    updateItemQuantity,
    error,
  };
};

export default useCart;