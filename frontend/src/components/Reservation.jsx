import React from "react";
import phone from "../assets/phone-call.png";

const Reservation = () => {
  return (
    <div className="reservation-section mt-36 mb-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0">
            <div className="header-text px-5 text-left">
              <span className="text-gray-600 font-cursive text-2xl
              ">Reserve your table</span>
              <h1 className="text-3xl font-bold mb-6">BOOK ONLINE</h1>
              <p className="mb-6 font-yeseva">
                Ehungry is a restaurant site. With this you can order the food of your choice online. Ehungry is a restaurant site. With this you can order the food of your choice online. Ehungry is a restaurant site. With this you can order the food of your choice online.
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
              <form className="text-start">
                <div className="space-y-4">
                  {['name', 'email', 'phone', 'person', 'date'].map((field, index) => (
                    <div key={index}>
                      <input
                        className="form-control w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-primary"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        type={field === 'email' ? 'email' : field === 'phone' || field === 'person' ? 'number' : field === 'date' ? 'date' : 'text'}
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className="btn-black mt-4 px-8 py-3 rounded-full bg-primary text-white hover:bg-orange-600 focus:outline-none">
                  Book Now
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