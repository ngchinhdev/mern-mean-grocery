import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

import { IoLayers } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";
import { IoBagCheck } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { RiCoupon2Fill } from "react-icons/ri";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/admin/dashboard",
    icon: <MdDashboard className="!text-[18px]" />,
    label: "Dashboard",
  },
  {
    key: "/admin/categories/list",
    icon: <IoLayers className="!text-[18px]" />,
    label: "Categories",
  },
  {
    key: "/admin/products/list",
    icon: <GiFruitBowl className="!text-[18px]" />,
    label: "Products",
  },
  {
    key: "/admin/users/list",
    icon: <FaUserGroup className="!text-[18px]" />,
    label: "Users",
  },
  {
    key: "/admin/orders/list",
    icon: <IoBagCheck className="!text-[18px]" />,
    label: "Orders",
  },
  {
    key: "5",
    icon: <RiCoupon2Fill className="!text-[18px]" />,
    label: "Coupons",
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
