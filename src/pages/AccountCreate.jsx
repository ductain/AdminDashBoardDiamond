import React from "react";
import { Button, Form, Input, Select, Space, message, Card, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
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
      .post("https://dvs-be-sooty.vercel.app/api/users", values, {
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
    <div className="tabled">
      <Row gutter={[24, 0]} style={{ display: "flex", justifyContent: "center" }}>
        <Col xs="24" xl={12}>
          <Card
            bordered={false}
            className="criclebox mb-24"
            title="Create New Account"
          >
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              style={{ maxWidth: 600, margin: "auto" }}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
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
                    message: "Please input your password!",
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
                    message: "Please input your first name!",
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
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"

              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="roleId"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "Please select a role!",
                  },
                ]}
              >
                <Select placeholder="Select a role">
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccountCreate;
