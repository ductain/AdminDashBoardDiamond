import React from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AccountCreate = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    axios
      .post("http://localhost:8080/api/createNewUser", values, {
        withCredentials: true,
      })
      .then((res) => {
        message.success("Created successfully");
        navigate("/accounts");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="Role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value={1}>Customer</Option>
            <Option value={2}>Valuation Staff</Option>
            <Option value={3}>Consulting Staff</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to={"/accounts"}>
              <Button>Cancel</Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountCreate;
