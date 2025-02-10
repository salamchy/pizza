import { FaUser, FaBriefcase, FaSignInAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Function to determine the active class
  const isActive = ({ isActive }) => (isActive ? "bg-gray-700 text-white" : "text-gray-300");

  // Mapping of menu items to their respective icons
  const menuItems = [
    { name: 'Upload Carousel', icon: <FaUser />, path: '/admin/upload-carousel' },
    { name: 'Companies', icon: <FaBriefcase />, path: '/' },
    { name: 'Account', icon: <FaSignInAlt />, path: '/' }
  ];

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-4 fixed">
      <div className="flex items-center mb-8">
        <NavLink to="/admin" className="text-2xl font-bold">
          <span className="text-orange-500">Basic</span>Store
        </NavLink>
      </div>
      <hr className='bg-white' />
      <nav className='mt-8'>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <NavLink
                to={item.path}
                className={isActive}
              >
                <div className="flex items-center p-2 hover:bg-gray-700 rounded">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;