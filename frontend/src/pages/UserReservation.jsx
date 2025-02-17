import Navbar from "../components/Navbar.jsx";
import { useGetUserReservationQuery } from "../features/createApi/reservationApi.js";

const UserReservation = () => {
  const { data: userReservations, isLoading, isError, error } = useGetUserReservationQuery();

  if (isLoading) return <div className="text-center text-indigo-600">Loading your reservations...</div>;
  if (isError) return <div className="text-center text-red-500">Error fetching your reservations: {error.message}</div>;

  if (!userReservations || !Array.isArray(userReservations.reservations) || userReservations.reservations.length === 0) {
    return <div className="text-center text-gray-600">You have no reservations.</div>;
  }

  const { reservations } = userReservations;

  return (
    <>
      <Navbar />
      <div className="container mt-5 mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Your Reservations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map((reservation, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <div className="mb-2">
                <p className="text-lg font-semibold">Name: <span className="font-normal">{reservation.name}</span></p>
              </div>
              <div className="mb-2">
                <p className="text-lg font-semibold">Email: <span className="font-normal">{reservation.email}</span></p>
              </div>
              <div className="mb-2">
                <p className="text-lg font-semibold">Phone: <span className="font-normal">{reservation.phone}</span></p>
              </div>
              <div className="mb-2">
                <p className="text-lg font-semibold">Number of Persons: <span className="font-normal">{reservation.person}</span></p>
              </div>
              <div className="mb-2">
                <p className="text-lg font-semibold">Date:
                  <span className="font-normal">
                    {typeof reservation.date === 'string'
                      ? new Date(reservation.date).toLocaleDateString()
                      : reservation.date.toLocaleDateString()}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">Status: <span className={`font-normal ${reservation.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>{reservation.status}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserReservation;