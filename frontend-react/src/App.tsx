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
import AdminCoupons from "./pages/admin/Coupons";
import AdminCouponList from "./features/admin/coupons/CouponList";
import AdminCouponEditor from "./features/admin/coupons/CouponEditor";
import AdminUsers from "./pages/admin/Users";
import AdminUserList from "./features/admin/users/UserList";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderList from "./features/admin/orders/OrderList";
import AdminOrderDetail from "./features/admin/orders/OrderDetail";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import OrderDetail from "./features/app/user/OrderDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
        children: [
          {
            path: "category/:categoryId",
            element: <Products />,
          },
          {
            path: "search/:search",
            element: <Products />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "user",
        element: <User />,
        children: [
          {
            path: "",
            element: <Navigate to="information" />,
          },
          {
            path: "information",
            element: <UpdateProfile />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "order/:id",
            element: <OrderDetail />,
          },
        ],
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "product/:productId",
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
        path: "",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
        children: [
          {
            path: "",
            element: <AdminProductList />,
          },
          {
            path: "list",
            element: <AdminProductList />,
          },
          {
            path: "add",
            element: <AdminProductEditor />,
          },
          {
            path: "edit/:id",
            element: <AdminProductEditor />,
          },
        ],
      },
      {
        path: "categories",
        element: <AdminCategories />,
        children: [
          {
            path: "",
            element: <AdminCategoryList />,
          },
          {
            path: "list",
            element: <AdminCategoryList />,
          },
          {
            path: "add",
            element: <AdminCategoryEditor />,
          },
          {
            path: "edit/:id",
            element: <AdminCategoryEditor />,
          },
        ],
      },
      {
        path: "coupons",
        element: <AdminCoupons />,
        children: [
          {
            path: "",
            element: <AdminCouponList />,
          },
          {
            path: "list",
            element: <AdminCouponList />,
          },
          {
            path: "add",
            element: <AdminCouponEditor />,
          },
          {
            path: "edit/:id",
            element: <AdminCouponEditor />,
          },
        ],
      },
      {
        path: "users",
        element: <AdminUsers />,
        children: [
          {
            path: "",
            element: <AdminUserList />,
          },
          {
            path: "list",
            element: <AdminUserList />,
          },
        ],
      },
      {
        path: "orders",
        element: <AdminOrders />,
        children: [
          {
            path: "",
            element: <AdminOrderList />,
          },
          {
            path: "list",
            element: <AdminOrderList />,
          },
          {
            path: "detail/:id",
            element: <AdminOrderDetail />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
      <ToastContainer className="w-auto min-w-[280px]" />
    </QueryClientProvider>
  );
}
