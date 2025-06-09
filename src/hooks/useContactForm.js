import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Global } from '../helpers/Global';

const useContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const submitForm = async () => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                ...formData,
                status: 1,
            };
            const base64Payload = btoa(JSON.stringify(payload));
            console.log('Payload codificado en Base64:', base64Payload);
            const response = await axios.post(`${Global.url}form/addRecord`, base64Payload, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            const base64Response = response.data;
            if (!base64Response) {
                throw new Error('Respuesta del servidor vacía.');
            }

            console.log('Respuesta del servidor (Base64):', base64Response);
            const decodedString = atob(base64Response);
            const parsedResponse = JSON.parse(decodedString);
            console.log('Respuesta parseada:', parsedResponse);
            if (parsedResponse.codeResponse === 1) {
                setResponseMessage(parsedResponse.messageResponse || 'Form submitted successfully!');
                navigate("/products", { state: { showSuccess: true } });
                return true;
            } else {
                setError(parsedResponse.messageResponse || 'Error al enviar el formulario.');
                return false;
            }
        } catch (err) {
            console.error('Error en submitForm:', err);
            setError(err.message || 'An unexpected error occurred.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        responseMessage,
        loading,
        error,
        handleInputChange,
        submitForm,
    };
};

export default useContactForm;