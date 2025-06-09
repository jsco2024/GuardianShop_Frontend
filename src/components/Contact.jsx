import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useContactForm from "../hooks/useContactForm";

const Contact = () => {
  const { formData, loading, error, handleInputChange, submitForm, responseMessage } = useContactForm(); // Incluimos responseMessage
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactPayload = {
      ...formData,
      status: 1,
    };

    try {
      const success = await submitForm(contactPayload);
      if (success) {
        toast.success(responseMessage || "Form submitted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/products", {
          state: { showSuccess: true, message: responseMessage || "Form submitted successfully!" },
        });
      } else {
        toast.error("Failed to submit the form. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error while submitting the form:", err);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center items-center flex-grow">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-fourty shadow-2xl rounded-lg p-6"
        >
          <h2 className="text-xl mb-4 text-center">Contáctanos</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full h-[48px] px-3"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full h-[48px] px-3"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full h-[48px] px-3"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full h-[48px] px-3"
              required
            />
            <textarea
              name="message"
              placeholder="Mensaje"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full h-[100px] px-3"
              required
            />
            <button
              type="submit"
              className="w-full h-[48px] btn-primary text-sm"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;