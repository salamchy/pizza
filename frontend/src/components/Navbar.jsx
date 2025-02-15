import { useState } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../features/createApi/authApi.js";
import { clearUser } from "../features/createSlice/authSlice.js";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 md:px-20 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold font-cursive">
        <span className="text-primary">e</span>Hungry
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700">
        {["HOME", "MENU", "GALLERY", "ABOUT"].map((label, index) => (
          <li key={index}>
            <NavLink
              to={label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-300 ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        {/* Show Orders and reservation Only if User is Logged In */}
        {user && (
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-300 ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
              }
            >
              ORDERS
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink
              to="/reservation"
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-300 ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
              }
            >
              RESERVATION
            </NavLink>
          </li>
        )}
      </ul>

      {/* Icons & Auth */}
      <div className="flex items-center space-x-4 text-gray-700">
        <Link to="/cart" className="relative">
          <FaShoppingCart />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">1</span>
        </Link>

        {!user ? (
          <Link
            to="/login"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center space-x-3">
            <Link to="/profile">
              <FaUser className="text-xl cursor-pointer" />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center space-y-4 py-4">
          {["HOME", "MENU", "GALLERY", "ABOUT"].map((label, index) => (
            <NavLink
              key={index}
              to={label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`}
              className={({ isActive }) =>
                `block py-2 text-lg ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `block py-2 text-lg ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              ORDERS
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/reservation"
              className={({ isActive }) =>
                `block py-2 text-lg ${isActive ? "text-primary font-semibold" : "text-gray-700"}`
              }
              onClick={() => setMenuOpen(false)}
            >
              RESERVATION
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
