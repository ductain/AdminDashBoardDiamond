import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button, Row, Col, Typography, Form, Input, Switch, message, Card } from "antd";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import '../css/SignIn.css';

const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [form] = Form.useForm();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowHidePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const onFinish = async (values) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:8080/api/login",
        values,
        { withCredentials: true }
      );

      if (res.data.user.role === "Admin") {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        message.success("Login successful!");
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
        message.error("You are not allowed to login!");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setErrMessage(err.response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content">
          <Title className="text-login">Sign In</Title>
          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="login-input"
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Username" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              className="login-input"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <div className="password-container">
                <Input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  suffix={
                    <div
                      className="password-toggle"
                      onClick={handleShowHidePassword}
                      style={{ cursor: 'pointer' }}
                    >
                      {isShowPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </div>
                  }
                />
              </div>
            </Form.Item>


            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                className="btn-login"
              >
                SIGN IN
              </Button>
            </Form.Item>
            {errMessage && <div className="error-message">{errMessage}</div>}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;