import React, { useContext } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
const { Header } = Layout;

const AppHeader = () => {
  const { dispatch, user } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header
      style={{
        backgroundColor: "#ADD8E6",
        color: "#000",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        position: "fixed",
        zIndex: 99,
        width: "100%",
        padding: "0 17%",
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
          <span style={{ marginLeft: "10px" }}>
            <Avatar
              size="large"
              style={{
                backgroundColor: "#1890ff",
                marginRight: "10px",
                fontSize: '20px'
              }}
            >
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Avatar>
            <span style={{ fontWeight: "bold" }}>{user.firstName} {user.lastName}</span>
          </span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
