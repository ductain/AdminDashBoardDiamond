import { SolutionOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const ManagerSidebar = () => {
  return (
    <Sider
      style={{
        height: "100vh",
        position: "fixed",
        background: "#000000",
      }}
    >
      <div
      >
        <img
          src="https://t4.ftcdn.net/jpg/02/39/44/75/360_F_239447528_qWYSonUIwGoNC290SfOBq8Gvy3x8ownV.jpg"
          alt="logo"
          style={{ width: "100%", height: "180px" }}
        />
      </div>
      <Menu theme='dark' defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<SolutionOutlined />}>
          <Link to="/manager/requests">Requests</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SolutionOutlined />}>
          <Link to="/manager/billing">Billings</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SolutionOutlined />}>
          <Link to="/manager/staff">Staff</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SolutionOutlined />}>
          <Link to="/manager/request-approved">Request Approval</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default ManagerSidebar