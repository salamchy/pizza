import { useGetAllReservationsQuery, useUpdateReservationMutation } from "../../features/createApi/reservationApi.js";
import { toast } from "react-toastify";

const Reservations = () => {
  const { data: reservationsData = {}, isLoading, isError, error, refetch } = useGetAllReservationsQuery();
  const [updateReservation, { isLoading: isUpdating }] = useUpdateReservationMutation();

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReservation({ id, status: newStatus });
      toast.success("Reservation status updated!");
      refetch();
    } catch (error) {
      toast.error(`Failed to update reservation status: ${error.data?.message || error.message}`);
    }
  };

  const reservations = Array.isArray(reservationsData.reservations) ? reservationsData.reservations : [];

  if (isLoading) return <div className="text-center text-indigo-600">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error loading reservations: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">All Reservations</h1>
      {reservations.length === 0 ? (
        <p className="text-center text-gray-600">No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.person}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof reservation.date === 'string'
                      ? new Date(reservation.date).toISOString().split('T')[0]
                      : reservation.date.toISOString().split('T')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      className="form-select block p-3 w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation._id, e.target.value)}
                      disabled={isUpdating}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reservations;