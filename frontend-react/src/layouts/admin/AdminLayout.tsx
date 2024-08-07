import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { FaShoppingBag } from "react-icons/fa";

import HeaderCustom from "./header";
import SidebarMenu from "./SidebarMenu";
import logoAdmin from "../../assets/logo-no-background.png";
import useAuth from "src/hooks/useAuth";
import Footer from "./Footer";

const { Sider, Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useAuth(true);

  return (
    <Layout className="tb-admin !bg-white">
      <Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        className={`${!collapsed ? "!w-[290px] !min-w-[290px]" : ""} !sticky left-0 top-0 h-screen`}
      >
        <div className="flex w-full items-center border-b border-gray-400 !bg-primary-600 px-9 py-4">
          {collapsed ? (
            <FaShoppingBag className="text-4xl text-white" />
          ) : (
            <img src={logoAdmin} alt="Logo Admin" className="h-10" />
          )}
        </div>
        <div className="h-[calc(100vh-72.72px)] overflow-y-auto">
          <div className="relative h-full overflow-hidden">
            <div className="no-scrollbar absolute inset-0 overflow-scroll">
              <SidebarMenu collapsed={collapsed} />
            </div>
          </div>
        </div>
      </Sider>
      <Content className="relative">
        <HeaderCustom collapsed={collapsed} onCollapse={toggleCollapsed} />
        <div className="relative flex flex-auto flex-col bg-white px-4 pb-20 pt-4 sm:px-6 sm:pt-6 md:px-8">
          <Outlet />
        </div>
        <Footer />
      </Content>
    </Layout>
  );
}
