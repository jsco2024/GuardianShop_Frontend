import { useState } from 'react';
import axios from 'axios';
import { Global } from '../helpers/Global';

const useRegister = () => {
    const [formData, setFormData] = useState({
        userName: '',
        name: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validatePasswords = () => {
        const match = formData.newPassword === formData.confirmPassword;
        setPasswordsMatch(match);
    };

    const handleRegister = async () => {
        if (!passwordsMatch) {
            setMessage('Passwords do not match!');
            console.warn('Attempted to register with non-matching passwords.');
            return;
        }

        try {
            const userObject = {
                userName: formData.userName,
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.newPassword,
                status: 1,
            };

            const response = await axios.post(Global.url + "auth/register", userObject, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            setSuccessMessage(response.data.message || 'Registration successful!');
            setErrorMessage(null);
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
            setSuccessMessage(null);
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    return {
        formData,
        message,
        passwordsMatch,
        handleInputChange,
        validatePasswords,
        handleRegister,
        successMessage,
        errorMessage,
    };
};

export default useRegister;