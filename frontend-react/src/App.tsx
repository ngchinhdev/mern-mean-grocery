import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// App pages
import AppLayout from "./layouts/app/AppLayout";
import Home from "./pages/app/Home";
import Products from "./pages/app/Products";
import About from "./pages/app/About";
import Contact from "./pages/app/Contact";
import ProductDetail from "./pages/app/ProductDetail";
import Checkout from "./pages/app/Checkout";
import User from "./pages/app/User";
import UpdateProfile from "./features/app/user/UpdateProfile";
import MyOrders from "./features/app/user/MyOrders";
import ChangePassword from "./features/app/user/ChangePassword";

// Admin pages
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminProductList from "./features/admin/products/ProductList";
import AdminProductEditor from "./features/admin/products/ProductEditor";
import AdminCategories from "./pages/admin/Categories";
import AdminCategoryList from "./features/admin/categories/CategoryList";
import AdminCategoryEditor from "./features/admin/categories/CategoryEditor";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import OrderDetail from "./features/app/user/OrderDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
        children: [
          {
            path: "/products/category/:categoryId",
            element: <Products />,
          },
          {
            path: "/products/search/:search",
            element: <Products />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/user",
        element: <User />,
        children: [
          {
            path: "/user",
            element: <Navigate to="/user/information" />,
          },
          {
            path: "/user/information",
            element: <UpdateProfile />,
          },
          {
            path: "/user/my-orders",
            element: <MyOrders />,
          },
          {
            path: "/user/change-password",
            element: <ChangePassword />,
          },
          {
            path: "/user/order/:id",
            element: <OrderDetail />,
          },
        ],
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetail />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/products",
        element: <AdminProducts />,
        children: [
          {
            path: "/admin/products/list",
            element: <AdminProductList />,
          },
          {
            path: "/admin/products/add",
            element: <AdminProductEditor />,
          },
          {
            path: "/admin/products/edit",
            element: <AdminProductEditor />,
          },
        ],
      },
      {
        path: "/admin/categories",
        element: <AdminCategories />,
        children: [
          {
            path: "/admin/categories/list",
            element: <AdminCategoryList />,
          },
          {
            path: "/admin/categories/add",
            element: <AdminCategoryEditor />,
          },
          {
            path: "/admin/categories/edit",
            element: <AdminCategoryEditor />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <RouterProvider router={router} />
      <ToastContainer className="w-auto min-w-[280px]" />
    </QueryClientProvider>
  );
}
