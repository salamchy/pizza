import React, { useState } from "react";
import phone from "../assets/phone-call.png";
import { useCreateReservationMutation } from "../features/createApi/reservationApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    person: "",
    date: "",
  });

  const [errorMessage, setErrorMessage] = useState({}); // Changed to object for per-field errors
  const [createReservation, { isLoading }] = useCreateReservationMutation();
  const navigate = useNavigate();

  // Check authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  const validateInput = (field, value) => {
    switch (field) {
      case 'name':
        return value.trim() !== '';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'phone':
        return /^\d{10}$/.test(value); // Assuming phone is 10 digits
      case 'person':
        return !isNaN(value) && parseInt(value) > 0;
      case 'date':
        return new Date(value) >= new Date();
      default:
        return true;
    }
  };

  const validateField = (field, value) => {
    if (!validateInput(field, value)) {
      setErrorMessage(prevState => ({
        ...prevState,
        [field]: `Invalid ${field}`
      }));
    } else {
      setErrorMessage(prevState => ({
        ...prevState,
        [field]: ""
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for the changed field
    setErrorMessage(prevState => ({
      ...prevState,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please log in to book a table.");
      navigate("/login");
      return;
    }

    // Validate all fields on submit
    for (const field in formData) {
      validateField(field, formData[field]);
    }

    // Check if there are no errors before submission
    if (Object.values(errorMessage).every(msg => msg === "")) {
      try {
        const response = await createReservation(formData).unwrap();
        toast.success(response.message || "Reservation successful!");
        setFormData({ name: "", email: "", phone: "", person: "", date: "" });
        toast.info("Check  your reservation for confirmation!");
      } catch (error) {
        let errorMessage = "Something went wrong";
        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        toast.error(errorMessage);
      }
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

  return (
    <div className="reservation-section mt-36 mb-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0">
            <div className="header-text px-5 text-left">
              <span className="text-gray-600 font-cursive text-2xl">Reserve your table</span>
              <h1 className="text-3xl font-bold mb-6">BOOK ONLINE</h1>
              <p className="mb-6 font-yeseva">
                Ehungry is a restaurant site. With this you can order the food of your choice online.
              </p>
              <h3 className="flex items-center">
                <img src={phone} alt="" className="w-8 h-8 mr-4" />
                <span className="text-3xl font-bold font-yeseva">9800998877</span>
              </h3>
            </div>
          </div>

          <div className="md:w-1/2 pl-0 md:pl-10">
            <div className="form-box">
              <h3 className="text-2xl font-bold text-gray-700 uppercase mb-4">Book a table</h3>
              <form className="text-start" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {["name", "email", "phone", "person", "date"].map((field, index) => (
                    <div key={index}>
                      <input
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={() => validateField(field, formData[field])}
                        className="form-control w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        type={
                          field === "email"
                            ? "email"
                            : field === "phone" || field === "person"
                              ? "number"
                              : field === "date"
                                ? "date"
                                : "text"
                        }
                        min={field === "date" ? today : ""}
                        required
                        aria-label={`${field.charAt(0).toUpperCase() + field.slice(1)} field`}
                      />
                      {errorMessage[field] && <p className="text-red-500 text-sm">{errorMessage[field]}</p>}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className={`btn-black mt-4 px-8 py-3 rounded-full bg-primary text-white cursor-pointer hover:bg-orange-600 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Booking..." : "Book Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;