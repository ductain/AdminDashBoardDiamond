import { SolutionOutlined, UserOutlined, AccountBookOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/imgs/logoweb.png";
import '../css/SiderComponent.css'; 

const { Sider } = Layout;

const ManagerSidebar = () => {
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
        <Menu.Item key="1" icon={<SolutionOutlined />} className="sider-menu-item">
          <Link to="/manager/requests" className="sider-menu-link">Requests</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AccountBookOutlined />} className="sider-menu-item">
          <Link to="/manager/billing" className="sider-menu-link">Billings</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />} className="sider-menu-item">
          <Link to="/manager/staff" className="sider-menu-link">Staff</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileDoneOutlined />} className="sider-menu-item">
          <Link to="/manager/request-approved" className="sider-menu-link">Request Approval</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default ManagerSidebar