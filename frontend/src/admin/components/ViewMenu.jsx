import { useDeleteMenuItemMutation, useGetAllMenuItemsForAdminQuery } from "../../features/createApi/menuApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMenu = () => {
  const { data, isLoading, isError } = useGetAllMenuItemsForAdminQuery({});
  const [deleteMenuItem, { isLoading: isDeleting }] = useDeleteMenuItemMutation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.isAdmin === true;

  // Extract menuItems from data, defaulting to an empty array if not present
  const menuItems = Array.isArray(data) ? data : (data?.data || []);

  const handleDelete = async (id) => {
    if (!isAdmin) {
      toast.error("Unauthorized action. Only admins can delete the Menu Item.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    };

    if (window.confirm("Are you sure you want to delete this Menu Item?")) {
      try {
        await deleteMenuItem(id).unwrap();
        toast.success("Menu Item deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } catch (err) {
        console.error("Failed to delete Menu Item:", err);
        toast.error(err?.data?.message || "Error deleting Menu Item. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleUpdate = (menuId) => {
    // Navigate to the update page with the product ID
    navigate(`/admin/update-menu/${menuId}`);
  };

  if (isLoading) return <div className="text-center text-indigo-600">Loading menu items...</div>;
  if (isError) return <div className="text-center text-red-500">Error loading menu items</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Our Menu</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            {isAdmin && (
              <>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.description.slice(0, 50)}...</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{item.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{item.stock}</div>
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleUpdate(item._id)}
                    disabled={isDeleting}
                    className="text-white rounded-lg p-3 bg-blue-500 hover:bg-blue-600 cursor-pointer mr-2 focus:outline-none"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={isDeleting}
                    className="text-white bg-red-500 hover:bg-red-700 cursor-pointer p-3 rounded-lg focus:outline-none"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMenu;