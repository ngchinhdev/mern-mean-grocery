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
        className={`${!collapsed ? "!w-[290px] !min-w-[290px]" : ""} !sticky left-0 top-0 h-dvh`}
      >
        <div className="flex w-full items-center border-b border-gray-400 !bg-primary-600 px-9 py-4">
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
        <div className="relative flex flex-auto flex-col bg-white px-4 pt-4 sm:px-6 sm:pt-6 md:px-8">
          <Outlet />
          <footer className="absolute bottom-0 flex h-16 flex-auto items-center !bg-white px-4 sm:px-6 md:px-8">
            <div className="flex w-full flex-auto items-center justify-between">
              <span>
                Copyright © 2024 <span className="font-semibold">Elstar</span>{" "}
                All rights reserved.
              </span>
              <div className="">
                <a className="text-gray" href="/#">
                  Term &amp; Conditions
                </a>
                <span className="text-muted mx-2"> | </span>
                <a className="text-gray" href="/#">
                  Privacy &amp; Policy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </Content>
    </Layout>
  );
}
