import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';
import { Global } from '../helpers/Global';

const useAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            dispatch(login()); 
        }
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAuth = async (mode) => {
        try {
            let response;
            if (mode === 'login') {
                response = await axios.post(Global.url + "auth/login", {
                    email: formData.email,
                    password: formData.password,
                });
                localStorage.setItem('authToken', response.data.jwt);
                dispatch(login()); // Actualizar el estado de Redux
                navigate('/products', { state: { showSuccess: true } });
            } else if (mode === 'register') {
                response = await axios.post(Global.url + "auth/register", {
                    ...formData,
                });
                navigate('/register');
            }
            setMessage(response.data.message || 'Success!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid Username or Password');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(logout()); // Actualizar el estado de Redux
        navigate('/login');
    };

    return [
        formData,
        message,
        handleInputChange,
        handleAuth,
        handleLogout,
    ];
};

export default useAuth;