import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

import { RxDashboard } from "react-icons/rx";
import { FiLayers } from "react-icons/fi";
import { BsBox } from "react-icons/bs";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/admin/dashboard",
    icon: <RxDashboard />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <FiLayers />,
    label: "Categories",
    children: [
      { key: "/admin/categories/list", label: "All Categories" },
      { key: "/admin/categories/add", label: "Add Category" },
    ],
  },
  {
    key: "/admin/products",
    icon: <BsBox />,
    label: "Products",
    children: [
      {
        key: "/admin/products/list",
        label: "All Products",
      },
      { key: "/admin/products/add", label: "Add Product" },
    ],
  },
  {
    key: "4",
    icon: <BsBox />,
    label: "Orders",
    children: [
      { key: "4.1", label: "All Orders" },
      { key: "4.2", label: "Add Order" },
    ],
  },
  {
    key: "5",
    icon: <BsBox />,
    label: "Users",
    children: [
      { key: "5.1", label: "All Users" },
      { key: "5.2", label: "Add User" },
    ],
  },
];

interface SidebarMenuProps {
  collapsed: boolean;
}

export default function SidebarMenu({ collapsed }: SidebarMenuProps) {
  const navigate = useNavigate();

  return (
    <Menu
      onClick={({ key }) => navigate(key)}
      defaultSelectedKeys={["/admin/dashboard"]}
      mode="inline"
      inlineCollapsed={collapsed}
      items={items}
      className="no-scrollbar h-full overflow-y-auto !border-none bg-primary-600 px-3 pt-3 text-white"
    />
  );
}
