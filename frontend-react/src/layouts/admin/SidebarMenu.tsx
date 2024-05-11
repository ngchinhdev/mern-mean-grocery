import type { MenuProps } from "antd";
import { Menu } from "antd";

import { RxDashboard } from "react-icons/rx";
import { FiLayers } from "react-icons/fi";
import { BsBox } from "react-icons/bs";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <RxDashboard />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <FiLayers />,
    label: "Categories",
    children: [
      { key: "2.1", label: "All Categories" },
      { key: "2.2", label: "Add Category" },
    ],
  },
  {
    key: "3",
    icon: <BsBox />,
    label: "Products",
    children: [
      { key: "3.1", label: "All Products" },
      { key: "3.2", label: "Add Product" },
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
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      inlineCollapsed={collapsed}
      items={items}
      className="h-full overflow-y-auto !border-none bg-primary-600 px-3 text-white"
    />
  );
}
