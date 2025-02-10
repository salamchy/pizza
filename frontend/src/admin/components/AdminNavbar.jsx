import { FaBell, FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  return (
    <nav className="bg-white shadow-md p-8 flex justify-end items-center w-full pl-64">
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 cursor-pointer" />
        <FaUserCircle className="text-gray-600 cursor-pointer" />
      </div>
    </nav>
  )
}
export default AdminNavbar