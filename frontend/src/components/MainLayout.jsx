import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const MainLayout = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}
export default MainLayout