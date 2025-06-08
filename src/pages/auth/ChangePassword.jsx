import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useChangePassword from '../../hooks/useChangePassword';
import axios from 'axios';
import { Global } from '../../helpers/Global';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const tokenFromQuery = query.get('token'); 
    const {
        formData,
        message,
        passwordsMatch,
        handleInputChange,
        validatePasswords,
        sendResetEmail,
        changePassword,
        setFormData,
        setMessage,
    } = useChangePassword();

    useEffect(() => {
        if (tokenFromQuery) {
            setFormData((prevData) => ({ ...prevData, token: tokenFromQuery }));

            const validateToken = async () => {
                try {
                    await axios.post(Global.url + "auth/validate-token", { token: tokenFromQuery });
                    setMessage('Token validated successfully.');
                } catch (error) {
                    if (error.response?.status === 401) {
                        setMessage('The token is invalid or has expired. Please request a new password reset link.');
                        navigate('/reset-password');
                    } else {
                        setMessage('An error occurred while validating the token.');
                    }
                }
            };

            validateToken();
        }
    }, [tokenFromQuery, setFormData, setMessage, navigate]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendResetEmail();
            toast.success('Email sent successfully! Redirecting to login...', {
                position: 'top-center',
                autoClose: 3000,
            });
            setTimeout(() => {
                navigate('/login'); 
            }, 3000);
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('An error occurred while sending the reset email.', {
                position: 'top-center',
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword();
    };

    return (
        <div className='container mx-auto mt-5 md:justify-center xl:top-0 md:top-2 sm:top-10 m-8 anyBox'>
            <ToastContainer />
            {message && <p>{message}</p>}
            {!tokenFromQuery ? (
                <form
                    onSubmit={handleEmailSubmit}
                    className='container md:w-[518px] md:h-[500px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox flex flex-col justify-center items-center'
                >
                    <h2 className='text-xl mb-2'>Reset Password</h2>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className='input-primary mb-2'
                        required
                    />
                    <button
                        type="submit"
                        className='w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary'
                    >
                        Send Reset Email
                    </button>
                </form>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className='container md:w-[518px] md:h-[500px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox flex flex-col justify-center items-center'
                >
                    <h2 className='text-xl mb-2'>Change Password</h2>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        onBlur={validatePasswords}
                        className='input-primary mb-2'
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={validatePasswords}
                        className='input-primary mb-2'
                        required
                    />
                    {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
                    <button
                        type="submit"
                        className='w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary'
                    >
                        Change Password
                    </button>
                </form>
            )}
        </div>
    );
};

export default ChangePassword;
