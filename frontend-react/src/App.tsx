import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// App pages
import AppLayout from "./layouts/app/AppLayout";
import Home from "./pages/app/Home";
import Products from "./pages/app/Products";
import About from "./pages/app/About";
import Contact from "./pages/app/Contact";
import Cart from "./pages/app/Cart";

// Admin pages
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminProductList from "./features/admin/products/ProductList";
import AdminProductEditor from "./features/admin/products/ProductEditor";

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
        path: "/cart",
        element: <Cart />,
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
            path: "/admin/products/product-list",
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
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
