import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout"
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminLayout from "./admin/AdminLayout";
import CarouselAdmin from "./admin/page/CarouselAdmin";
import CarouselUpload from "./admin/components/CarouselUpload";

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        // {
        //   path: '/cart',
        //   element: (
        //     <ProtectedRoute>
        //       <CartItems />
        //     </ProtectedRoute>
        //   )
        // }
      ]
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/carousels",
          element: <CarouselAdmin />,
        },
        {
          path: "/admin/upload-carousel",
          element: <CarouselUpload />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
