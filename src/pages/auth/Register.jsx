import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRegister from '../../hooks/useRegister';

const Register = () => {
  const {
    formData,
    message,
    passwordsMatch,
    handleInputChange,
    validatePasswords,
    handleRegister,
    successMessage,
    errorMessage,
  } = useRegister();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await handleRegister();
  };

  useEffect(() => {
    if (successMessage) {
      setShowSuccessMessage(true);
      toast.success('User successfully registered! Redirecting to login..', {
        position: 'top-center',
        autoClose: 3000,
      });

      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  return (
    <div>
      <ToastContainer />
      <div className='container mx-auto mt-5 md:justify-center xl:top-0 md:top-2 sm:top-10 m-8 anyBox'>
        <form onSubmit={handleSubmit} className='container md:w-[518px] md:h-[684px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox'>
          <div className='anyBox flex-row w-[193px] h-[252px] mx-10 md:ml-18 p-5'>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleInputChange}
              className='input-primary'
              required
            />

            <input
              type="text"
              name="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleInputChange}
              className='input-primary'
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className='input-primary'
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className='input-primary'
              required
            />

            <input
              type="password"
              name="newPassword"
              placeholder="Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              onBlur={validatePasswords}
              className='input-primary'
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={validatePasswords}
              className='input-primary'
              required
            />
            {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}

            <button
              type='submit'
              className='w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary mb-5'
            >
              {successMessage ? 'Enviado' : 'Enviar'}
            </button>

            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            {showSuccessMessage && <div className="text-green-500">Usuario registrado con éxito!</div>}
          </div>

          <footer className='p-2 mx-10 bottom-0'>

          </footer>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;