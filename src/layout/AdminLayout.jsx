import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import SiderComponent from "../components/SideBar";

const { Sider, Content } = Layout;

export default function AdminLayout() {
  return (
    <Layout>

      <Sider>
        <SiderComponent />
      </Sider>
      <Layout>
        <AppHeader />
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Content
            style={{
              padding: " 0 50px",
              margin: "90px 20px",
            }}
          >
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
