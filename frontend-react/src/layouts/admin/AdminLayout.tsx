import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { FaShoppingBag } from "react-icons/fa";

import HeaderCustom from "./header";
import SidebarMenu from "./SidebarMenu";

import logoAdmin from "../../assets/logo-light_hls14v.svg";

const { Sider, Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        className={`${!collapsed ? "!w-[290px] !min-w-[290px]" : ""} h-screen`}
      >
        <div className="flex w-full items-center bg-primary-600 px-9 py-4">
          {collapsed ? (
            <FaShoppingBag className="text-4xl text-white" />
          ) : (
            <img src={logoAdmin} alt="Logo Admin" className="h-10" />
          )}
        </div>
        <SidebarMenu collapsed={collapsed} />
      </Sider>
      <Content>
        <HeaderCustom collapsed={collapsed} onCollapse={toggleCollapsed} />
        <Outlet />
      </Content>
    </Layout>
  );
}
