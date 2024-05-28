import React, { useContext } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
const { Header } = Layout;

const AppHeader = () => {
    const { dispatch, user } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      style={{
        backgroundColor: "#000000",
        color: "#fff",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        
        zIndex: 1,
        width: "100%",
        padding: "0 15%",
        boxSizing: "border-box",
      }}
    >
      <Dropdown overlay={userMenu}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#fff", marginLeft: "10px" }}>
            Welcome, {user.firstName} {user.lastName}
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
