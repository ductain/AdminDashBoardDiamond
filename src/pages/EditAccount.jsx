import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Card, Spin, Select, message, Space } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Option } = Select;
const { useForm } = Form;

const roleMapping = {
    1: "Customer",
    2: "Valuation Staff",
    3: "Consulting Staff",
};

const EditAccount = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = useForm();
    const [userEdited, setUserEdited] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://dvs-be-sooty.vercel.app/api/users/${id}`, { withCredentials: true });
                const user = response.data.user[0];
                setUserEdited({ ...user, roleId: roleMapping[user.roleId] });
                form.setFieldsValue({
                    ...user,
                    roleId: roleMapping[user.roleId],
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    });

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const handleInputChange = (name, value) => {
        setUserEdited({ ...userEdited, [name]: value });
    };

    const handleRoleChange = (value) => {
        setUserEdited({ ...userEdited, roleId: value });
    };

    const handleSave = async () => {
        try {
            const updatedUser = { ...userEdited, roleId: parseInt(Object.keys(roleMapping).find(key => roleMapping[key] === userEdited.roleId)) };
            await axios.put(`https://dvs-be-sooty.vercel.app/api/users`, updatedUser, { withCredentials: true });
            message.success("User information updated successfully!");
            navigate("/accounts");
        } catch (error) {
            message.error("Failed to update user information.");
            console.error(error);
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
    }

    return (
        <Card title="Edit Account" style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input prefix={<UserOutlined />} onChange={(e) => handleInputChange("firstName", e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input prefix={<UserOutlined />} onChange={(e) => handleInputChange("lastName", e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<MailOutlined />} onChange={(e) => handleInputChange("email", e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input prefix={<PhoneOutlined />} onChange={(e) => handleInputChange("phone", e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="roleId"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                >
                    <Select onChange={handleRoleChange}>
                        <Option value="Customer">Customer</Option>
                        <Option value="Valuation Staff">Valuation Staff</Option>
                        <Option value="Consulting Staff">Consulting Staff</Option>
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
    );
};

export default EditAccount;
