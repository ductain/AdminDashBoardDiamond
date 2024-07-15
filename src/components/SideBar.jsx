import { CustomerServiceOutlined, DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/imgs/logoweb.png";
import '../css/SiderComponent.css';

const { Sider } = Layout;

const SiderComponent = () => {
  return (
    <Sider
      style={{
        height: "100vh",
        position: "fixed",
        background: "#ADD8E6",
      }}
    >
      <div className="sider-logo">
        <img
          src={Logo} alt="Logo"
        />
      </div>
      <Menu theme='light' defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DesktopOutlined />} className="sider-menu-item">
          <Link to="/admin/dashboard" className="sider-menu-link">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />} className="sider-menu-item">
          <Link to="/admin/accounts" className="sider-menu-link">Accounts</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<CustomerServiceOutlined />} className="sider-menu-item">
          <Link to="/admin/service" className="sider-menu-link">Service</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderComponent;
