import { Outlet } from "react-router-dom"
import AdminNavbar from "./components/AdminNavbar"
import Sidebar from "./components/Sidebar"

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <AdminNavbar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
export default AdminLayout