import { Link } from 'react-router-dom';
import blackTopLayer from '../assets/black-top-layer.png';

const Footer = () => {
  return (
    <div className=" bg-gray-900 relative py-24 md:pt-38">
      {/* Top Layer */}
      <div className="absolute w-full h-32 top-0 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${blackTopLayer})` }}></div>

      <div className="container mx-auto text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-5">
          <div className="mb-10 md:mb-0">
            <div className="footer-box">
              <h3 className="text-2xl font-cursive mb-6"><span className="text-primary font-cursive">e</span >hungry</h3>
              <p className="text-gray-400">16 ringRoad Rd, Kathmandu, cdysec G83 8EG, KTM 69QJ+2F cdysec, Nepal</p>
              <p className="text-gray-400">PHONE - +977 9800998877, +977 9855443322</p>
              <p className="text-gray-400">EMAIL - support@ehungry.com</p>
            </div>
          </div>
          <div className="mb-10 md:mb-0">
            <div className="footer-box">
              <h5 className="uppercase mb-6 text-lg">Useful Links</h5>
              <ul className="space-y-4">
                <li><Link className="link transition duration-400 text-gray-400 hover:text-orange-500" to="/home">Home</Link></li>
                <li><Link className="link transition duration-400 text-gray-400 hover:text-orange-500" to="/menus">Menus</Link></li>
                <li><Link className="link transition duration-400 text-gray-400 hover:text-orange-500" to="/about">About Us</Link></li>
                <li><Link className="link transition duration-400 text-gray-400 hover:text-orange-500" to="/appointment">Appointment</Link></li>
              </ul>
            </div>
          </div>
          <div className="mx-auto md:mx-0">
            <div className="footer-box hour-box max-w-[300px]">
              <h5 className="uppercase mb-6 text-lg">OPENING HOURS</h5>
              <ul className="space-y-4">
                <li>Mon - Tues : <span className="float-right">6.00 am - 10.00 pm</span></li>
                <li>Wed - Thurs : <span className="float-right">6.00 am - 10.00 pm</span></li>
                <li>Launch : <span className="float-right">Everyday</span></li>
                <li>Sunday : <span className="float-right bg-orange-500 text-white px-2 py-1">Closed</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center border-t border-gray-700 pt-8 text-gray-400">
          <span>ehungry all Rights Reserved! © 2025 </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;