import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../features/createApi/authApi.js";
import { clearUser } from "../features/createSlice/authSlice.js";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from Redux state
  const { user } = useSelector((state) => state.auth);

  // Logout API mutation
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); // Call API to log out the user
      dispatch(clearUser()); // Clear user data in Redux store
      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-between items-center py-4 bg-white">
        <div className="flex items-center justify-between w-full px-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <span className="text-orange-500">Basic</span>Store
          </Link>

          {/* Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-700">
            {[
              { path: "/", label: "HOME" },
              { path: "/about", label: "ABOUT" },
              { path: "/shop", label: "SHOP" },
              { path: "/contact", label: "CONTACT" },
            ].map(({ path, label }) => (
              <li key={label} className="relative">
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `cursor-pointer gap-3 transition-all duration-300 ease-in-out ${isActive ? "text-orange-500 font-semibold" : "text-gray-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Icons & Auth */}
          <div className="flex space-x-4 text-gray-700 items-center">
            {/* Shopping Cart */}
            <Link to="/cart" className="cursor-pointer relative">
              <FaShoppingCart />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                1
              </span>
            </Link>

            {/* Show Login button if user is NOT logged in */}
            {!user ? (
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
              >
                Login
              </Link>
            ) : (
              // Show User Icon & Logout if user is logged in
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <FaUser className="text-xl cursor-pointer" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
