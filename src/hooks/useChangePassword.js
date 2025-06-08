import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Global } from '../helpers/Global';

const useChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
        token: '',
    });
    const [message, setMessage] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validatePasswords = () => {
        setPasswordsMatch(formData.newPassword === formData.confirmPassword);
    };

    const sendResetEmail = async () => {
        try {
            const response = await axios.post(Global.url + "auth/reset-password", {
                email: formData.email,
            });
            setMessage(response.data.message || 'Password reset link sent to your email!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Email not found');
        }
    };

    const changePassword = async () => {
        if (!passwordsMatch) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post(Global.url + "auth/change-password", {
                newPassword: formData.newPassword,
                token: formData.token,
            });
            setMessage(response.data.message || 'Password changed successfully!');
            navigate('/login');
        } catch (error) {
            if (error.response?.status === 401) {
                setMessage('The token has expired. Please request a new password reset link.');
            } else {
                setMessage(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    return {
        formData,
        message,
        passwordsMatch,
        setMessage,
        handleInputChange,
        validatePasswords,
        sendResetEmail,
        changePassword,
        setFormData,
    };
};

export default useChangePassword;